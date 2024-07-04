import json
import base64
import boto3
from PIL import Image



#s3 = boto3.client('s3')

def handler(event, context):
  print('received event: ', event)
  get_raw_path    = "/NewGetP"
  create_raw_path = "/postP"
  
  picture_path   = "/"
  
  time = "8:14"
  message = {"f_name":"AAAAAAA", "l_name":"BBBBBBBBBB"}
  
  if event['path'] == get_raw_path:
    # call database
    pid = event['queryStringParameters']['p_id']
    print ("Using GEEEEEEEETTTTT")
    print ("received number: ", pid, type(pid), int(pid)+5)
    print ('Hello from your new Amplify Python lambda GET !' + time)
    #return { "aaaaaaaaaaaaaaaaa": "bbbbbbbbb"  }
    #message = {"f_name":"AAAAAAA", "l_name":"BBBBBBBBBB"}
    # not worked:
    #return {"f_name":"AAAAAAA", "l_name":"BBBBBBBBBB"} 
    # worked
    return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET' }, 'body': json.dumps( message )#'Hello from your new Amplify Python lambda GET !' + time)
          }
    
          
          
  elif  event['path'] == create_raw_path:
    print ("Using POSSSSSSSSSST")
    
    body = json.loads(event['body'])
    f_name = body['f_name']
    l_name = body['l_name']
    print ("received names:  ",  f_name, l_name)
    print ('Hello from your new Amplify Python lambda- POST!'  + time)
    # return {"f_name_received": f_name}
    #worked
    return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST' }, 'body': json.dumps(message)
          }
    
          
  else:
    '''
    print ("received at AWS Lambdaaaaaaaaaaaaaaaaaa!!!!!!!!!!!!!  " + time)
    print ("Check CloudWatch")
    
    photo = event['body']
 
    #thumbnail_size = (50, 50)
    #image = Image.open(BytesIO(photo))
    #image.thumbnail(thumbnail_size) 
    #body = json.loads(event['body'])
    #file_content = body.get('file', '')
    print ("Event ",event)
    #with open(save_path, 'wb') as f:
    #  f.write(file_content)    
    return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'  },  'body': json.dumps(photo) } '''
    # Assuming 'body' contains the multipart/form-data
    body = event['body']
    #binary_data = base64.b64decode(body)
    # Extract the binary file content from multipart/form-data
    '''
    file_content = extract_file_content(body)
    
    # Encode the binary file content to Base64
    base64_encoded = base64.b64encode(file_content).decode('utf-8')
    '''
    #bucket_name = 'amplify-jun2724-dev-110853-deployment'  # Replace with your S3 bucket name
    #file_name = 'example_image.webp'  # Replace with the desired file name
    # Decode Base64 to binary data
    #binary_data = base64.b64decode(base64_encoded)

    print (event['body'])   
    #binary_data = base64.b64decode(base64_encoded)
    #try:
    #  s3.put_object(Body=body, Bucket=bucket_name, Key='test2', ContentType='image/webp')
    
    #except Exception as error:
    #  print (error)            
    # Prepare the response
    '''
    return {
        'statusCode': 200,
        'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET' ,        
          'Content-Type': 'image/webp'  # Adjust content type as per your file type
        }, 'isBase64Encoded': True , 
        'body': json.dumps( base64_encoded ) }
    '''
    return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'  },  'body': json.dumps(body) }   


def extract_file_content(body):
    # Example function to extract file content from multipart/form-data body
    # You need to implement this based on your specific data structure
    # Here's a basic example assuming 'file' is a form-data part
    boundary = body.split(b'\r\n')[0].decode('utf-8').split('=')[1]
    parts = body.split(boundary.encode())
    file_content = None
    
    for part in parts:
        if b'filename="file"' in part:
            file_content = part.split(b'\r\n\r\n')[1].strip(b'\r\n-')
            break
    
    return file_content
  
      
          

          
          
  
          
