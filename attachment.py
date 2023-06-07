import json
import requests

def send_file_and_json(filename, json_data, url):
    with open(filename, 'rb') as file:
        files = {'file': file}
        data = {'json_data': json.dumps([json_data])}
        response = requests.post(url, files=files, data=data)
    
    if response.status_code == 200:
        print('File and JSON data successfully sent.')
    else:
        print('An error occurred while sending the file and JSON data.')

# Replace 'file_to_send.txt' with the actual path of the file you want to send
file_path = 'test.txt'
json_data = {'key1': 'value1', 'key2': 'value2'}
api_url = 'http://127.0.0.1:7777/Ticket/API/Create_Ticket'

send_file_and_json(file_path, json_data, api_url)
