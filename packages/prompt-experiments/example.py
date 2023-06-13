from init import init
init()

from vertexai.preview.language_models import TextGenerationModel

def interview(temperature: float = .2) -> None:
    """Ideation example with a Large Language Model"""

    # TODO developer - override these parameters as needed:
    parameters = {
        "temperature": temperature,  # Temperature controls the degree of randomness in token selection.
        "max_output_tokens": 256,    # Token limit determines the maximum amount of text output.
        "top_p": .8,                 # Tokens are selected from most probable to least until the sum of their probabilities equals the top_p value.
        "top_k": 40,                 # A top_k of 1 means the selected token is the most probable among all tokens.
    }

    model = TextGenerationModel.from_pretrained("text-bison")
    response = model.predict(
        'Give me ten interview questions for the role of program manager.',
        **parameters,
    )
    print(f"Response from Model: {response.text}")

if __name__ == '__main__':
    interview()
