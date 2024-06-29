import json

def handler(event, context):
  print('received event: ', event)
  get_raw_path    = "/NewGetP"
  create_raw_path = "/postP"
  
  picture_path   = "/"
  
  time = "11:22"
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
    # Ensure we're receiving a POST request with multipart/form-data content
    #if event['httpMethod'] != 'POST':
    #  return {'statusCode': 400, 'body': json.dumps({'error': 'Method not allowed'})  
    # Photo experiment: 7:17 am
    print ("received at AWS Lambdaaaaaaaaaaaaaaaaaa!!!!!!!!!!!!!   1:26 pm")
    print ("Check CloudWatch")
    
    photo = event['body']
    # Test:
    #thumbnail_size = (50, 50)
    #image = Image.open(BytesIO(photo))
    #image.thumbnail(thumbnail_size) 
    
    
    #body = json.loads(event['body'])
    #file_content = body.get('file', '')
    print ("Event ",event)
    #print ("file_content: ", file_content)
    #save_path = 'Jun_28_picture.jpg'  
    #with open(save_path, 'wb') as f:
    #  f.write(file_content)
    # Now I want to send it back!
    
    return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'  },  'body': json.dumps(photo) }
          
  
          
