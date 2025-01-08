import requests
import json

# Function to fetch the JSON from the given URL
def fetch_game_data(url):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check if the request was successful
        return response.json()  # Return JSON data
    except requests.exceptions.RequestException as e:
        print(f"Error fetching the data: {e}")
        return None

# Function to update the URL and image paths
def update_url_and_image(game):
    # Add base URL in front of the url and image fields
    game['url'] = f"https://kaizo-loveschicken.onrender.com{game['url']}"
    game['image'] = f"https://kaizo-loveschicken.onrender.com{game['image']}"
    return game

# Function to save the processed games as a new JSON file
def save_to_json(games, filename="./games.json"):
    try:
        with open(filename, 'w') as f:
            json.dump(games, f, indent=4)
        print(f"Games data has been successfully saved to {filename}")
    except IOError as e:
        print(f"Error saving to JSON file: {e}")

# Main function to execute the steps
def main():
    url = "https://kaizo-loveschicken.onrender.com/games/games.json"
    game_data = fetch_game_data(url)  # Fetch game data
    
    if game_data:
        # Update the URL and image for each game
        updated_games = [update_url_and_image(game) for game in game_data]
        save_to_json(updated_games)  # Save the updated game data as JSON
    else:
        print("No game data to process.")

# Run the script
if __name__ == "__main__":
    main()
