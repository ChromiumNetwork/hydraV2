import requests
import os
import time
import threading
import sys

# Loader control variables
stop_loader = False

# Function to display a loader animation
def show_loader():
    global stop_loader
    animation = "|/-\\"
    idx = 0
    while not stop_loader:
        sys.stdout.write(f"\r{animation[idx % len(animation)]}")
        sys.stdout.flush()
        idx += 1
        time.sleep(0.1)
    sys.stdout.write("\r" + " " * 10 + "\r")  # Clear the loader line when done

# Function to download and save the games.json file locally
def download_games_json(url, save_path="./games/games.json"):
    global stop_loader
    try:
        print("Starting download...")
        os.makedirs(os.path.dirname(save_path), exist_ok=True)  # Create directory if it doesn't exist

        # Start loader in a separate thread
        loader_thread = threading.Thread(target=show_loader, daemon=True)
        loader_thread.start()

        # Make the request to download the file
        response = requests.get(url, stream=True)
        response.raise_for_status()  # Check if the request was successful

        # Process and save the file
        with open(save_path, "wb") as file:
            for chunk in response.iter_content(chunk_size=8192):  # Download in chunks
                if chunk:
                    file.write(chunk)  # Write chunk to file

        stop_loader = True
        loader_thread.join()

        print("\nDownload complete!")
        print(f"Downloaded games.json and saved to {save_path}")
        return save_path
    except requests.exceptions.RequestException as e:
        stop_loader = True
        loader_thread.join()
        print(f"\nError downloading the games.json file: {e}")
        return None
    except IOError as e:
        stop_loader = True
        loader_thread.join()
        print(f"\nError saving the games.json file: {e}")
        return None

# Run the script
if __name__ == "__main__":
    url = "https://kaizo-theassetsvro.onrender.com/games/games.json"
    download_games_json(url)  # Download the games.json from the URL
