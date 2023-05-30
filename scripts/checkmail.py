from imapclient import IMAPClient

HOST = 'mail.peddn.net'
USERNAME = 'systembetreuer@peddn.net'
PASSWORD = 'YtZ}aacA(vj2]JwFpsVyYd{2d:m.WD'

server = IMAPClient(HOST)
server.login(USERNAME, PASSWORD)
server.select_folder('INBOX')

# Start IDLE mode
server.idle()
print("Connection is now in IDLE mode, send yourself an email or quit with ^c")

while True:
    try:
        # Wait for up to 30 seconds for an IDLE response
        responses = server.idle_check(timeout=30)
        print("Server sent:", responses if responses else "nothing")
        for response in responses:
            if response[1] == b'RECENT':
                if response[0] > 0:
                    # close IDLE mode...
                    # https://imapclient.readthedocs.io/en/master/api.html#imapclient.IMAPClient.idle
                    server.idle_done()
                    
                    # Fetch the latest unseen message
                    messages = server.search('RECENT')
                    if messages:
                        for message in messages:
                            # Fetch the message envelope to get the subject
                            response = server.fetch([message], ['ENVELOPE'])
                            envelope = response[message][b'ENVELOPE']
                            subject = envelope.subject.decode('utf-8')
                            print("subject:", subject)
                            # Mark the message as read
                            server.add_flags(message, [b'\\Seen'])
                    # switch back to IDLE mode
                    server.idle()
    except KeyboardInterrupt:
        break

server.idle_done()
print("\nIDLE mode done")
server.logout()
print("\nLogged out. BYE!")
