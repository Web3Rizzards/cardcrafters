from google.cloud import aiplatform

# api key: AIzaSyA181trpPzrq7W6hV5Q5tnf151YIheDhwU

def init():
  aiplatform.init(
      project='cardcrafters',

      location='us-central1',

      # # Google Cloud Storage bucket in same region as location
      # # used to stage artifacts
      # staging_bucket='gs://my_staging_bucket',

      # # custom google.auth.credentials.Credentials
      # # environment default creds used if not set
      # credentials="",

      # # customer managed encryption key resource name
      # # will be applied to all Vertex AI resources if set
      # encryption_spec_key_name=my_encryption_key_name,

      # the name of the experiment to use to track
      # logged metrics and parameters
      experiment='prompt-experiments',

      # description of the experiment above
      experiment_description='prompt experiments'
  )