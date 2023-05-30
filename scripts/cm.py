import os
import re
import requests
from imapclient import IMAPClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

HOST = os.getenv("HOST")
USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")
INTERNAL_TICKET_PREFIX = os.getenv("INTERNAL_TICKET_PREFIX")
API_URL = os.getenv("API_URL")
BEARER_TOKEN = os.getenv("BEARER_TOKEN")  # Bearer Token from .env file

class DataExtractionError(Exception):
    pass

def establish_server_connection():
    server = IMAPClient(HOST)
    server.login(USERNAME, PASSWORD)
    server.select_folder('INBOX')
    return server

def process_subject(subject):
    print(subject)
    # Regular expressions to extract information
    external_ticket_regex = r"\[([-\w]+)\s#(\d+)\]"
    description_regex = r"]\s-\s(.*?)\s\["
    internal_ticket_regex = rf"\[{INTERNAL_TICKET_PREFIX}\s#(.*?)\]"

    # Extract external ticket number
    external_ticket_match = re.search(external_ticket_regex, subject)
    if external_ticket_match:
        ticket_type = external_ticket_match.group(1)
        ticket_number = external_ticket_match.group(2)
    else:
        raise DataExtractionError("Failed to extract external ticket data")

    # Extract description
    description_match = re.search(description_regex, subject)
    if description_match:
        description = description_match.group(1)
    else:
        raise DataExtractionError("Failed to extract the description")

    # Extract internal ticket UUID
    internal_ticket_match = re.search(internal_ticket_regex, subject)
    if internal_ticket_match:
        internal_ticket_uuid = internal_ticket_match.group(1)
    else:
        raise DataExtractionError("Failed to extract the internal ticket UUID")

    return ticket_type, ticket_number, description, internal_ticket_uuid

def handle_incoming_mail(server, response):
    if response[1] == b'RECENT' and response[0] > 0:
        server.idle_done()
        try:
            process_incoming_mail(server)
        except DataExtractionError as e:
            print(f"Warning: {e}")
        server.idle()

def send_to_api_endpoint(data):
    endpoint = API_URL + '/api/tickets/external'
    headers = {
        'Authorization': 'Bearer ' + BEARER_TOKEN  # Add Bearer Token to the headers
    }
    response = requests.post(endpoint, json=data, headers=headers)
    if response.status_code != 200:
        print(f"Failed to post data to API, status code: {response.status_code}")

def process_incoming_mail(server):
    messages = server.search('RECENT')
    if messages:
        for message in messages:
            response = server.fetch([message], ['ENVELOPE'])
            envelope = response[message][b'ENVELOPE']
            subject = envelope.subject.decode('utf-8')
            try:
                ticket_type, ticket_number, description, internal_ticket_uuid = process_subject(subject)
                data = {
                    'ticket_type': ticket_type,
                    'ticket_number': ticket_number,
                    'description': description,
                    'internal_ticket_uuid': internal_ticket_uuid,
                }
                send_to_api_endpoint(data)
            except DataExtractionError as e:
                print(f"Warning: {e}")
            server.add_flags(message, [b'\\Seen'])

def main():
    try:
        server = establish_server_connection()
        server.idle()
        print("Connection is now in IDLE mode, send yourself an email or quit with ^c")

        while True:
            responses = server.idle_check(timeout=30)
            print("Server sent:", responses if responses else "nothing")
            for response in responses:
                handle_incoming_mail(server, response)
    except KeyboardInterrupt:
        print("\nIDLE mode done")
        server.idle_done()
        server.logout()
        print("\nLogged out. BYE!")
    except Exception as e:
        print(f"An error occurred: {str(e)}")

if __name__ == "__main__":
    main()
