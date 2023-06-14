from init import init

init()

from vertexai.preview.language_models import TextGenerationModel

temperature = 0.2

prelude = """
You are an assistant for designing cards for a deckbuilding game. 

A game has 2 players that take turns playing cards, activating card abilities, and attacking with creature cards.

There are 2 types of cards: creature cards and spell cards.

Creature cards have a name, cost, power, toughness, and ability. A creature's ability can be activated once each turn. When a creature is dealt damage at least its toughness, it is destroyed.

Spell cards have a name, cost, and ability. A spell's ability is activated once when the spell is played, and then the spell is discarded.

To attack, the attacking player attacks with some creature cards, then the defending player can choose to block some of the attacking creature cards with defending creatures, then blocked attacking creatures fight their blocking creatures and unblocked attacking creatures deal damage to the defending player.

When a player's health reaches 0, they lose the game.
""".strip()


def makeCreatureCard() -> None:
    model = TextGenerationModel.from_pretrained("text-bison")
    parameters = {
        "temperature": temperature,
        "max_output_tokens": 256,
        "top_p": 0.8,
        "top_k": 40,
    }
    response = model.predict(
        f"""
{prelude}

Design a new creature card based on the theme "giant killer space alien invasion robots with magical powers". The card ability should be interesting and thematic. Reply in EXACTLY the following JSON format:

```
{{ 
  "name": string
  "cost": number
  "attack": number
  "toughness": number
  "ability": string
}}
```
  """.strip(),
        **parameters,
    )

    print(response)


if __name__ == "__main__":
    makeCreatureCard()
