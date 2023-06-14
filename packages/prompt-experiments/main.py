from init import init

init()

from vertexai.preview.language_models import TextGenerationModel

temperature = 0.6

parameters = {
    "temperature": temperature,
    "max_output_tokens": 256,
    "top_p": 0.8,
    "top_k": 40,
}

model = TextGenerationModel.from_pretrained("text-bison")

prelude = """
You are an assistant for designing cards for a deckbuilding game. 

A game has 2 players that take turns playing cards, activating card abilities, and attacking with creature cards.

There are 2 types of cards: creature cards and spell cards.

Creature cards have a name, cost, power, toughness, and ability. A creature's ability can be activated once each turn. When a creature is dealt damage at least its toughness, it is destroyed.

Spell cards have a name, cost, and ability. A spell's ability is activated once when the spell is played, and then the spell is discarded.

To attack, the attacking player attacks with some creature cards, then the defending player can choose to block some of the attacking creature cards with defending creatures, then blocked attacking creatures fight their blocking creatures and unblocked attacking creatures deal damage to the defending player.

When a player's health reaches 0, they lose the game.
""".strip()


def makeCreatureCardName(theme: str) -> str:
    response = model.predict(
        f"""
{prelude}

Design the name for a new creature card with the theme "{theme}". Reply with JUST the card name.
```
  """.strip(),
        **parameters,
    )

    return response


def makeCreatureCardAbility(theme: str, name: str, specialization: str) -> str:
    response = model.predict(
        f"""
{prelude}

Design the ability of a new creature card with the theme "{theme}" with the name "{name}". The ability should be {specialization}. Reply with JUST the one-sentence ability.
```
  """.strip(),
        **parameters,
    )

    print(response)


if __name__ == "__main__":
    theme = "sneaky robot pirates"
    name = makeCreatureCardName(theme)
    ability = makeCreatureCardAbility(theme, name, "attack related")
