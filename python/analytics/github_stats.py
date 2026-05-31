import requests

def get_github_stats(username="sharmarke"):
    url = f"https://api.github.com/users/{username}/repos"
    repos = requests.get(url).json()
    print(f"Total public repos: {len(repos)}")

if __name__ == "__main__":
    get_github_stats()