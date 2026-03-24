from playwright.sync_api import sync_playwright, expect
import os
from dotenv import load_dotenv

load_dotenv()

# change the base url to your domain/droplet
DOMAIN = os.getenv("LEAPMILE_DEPLOYMENT_NAME")
url = os.getenv("LEAPMILE_HOST_BASEURL", "https://magesh.leapmile.com")

def test_login(page, phone, password):
    # Watch for 500 errors
    def handle_response(response):
        if response.status >= 500:
            print(f"❌ {response.status} Internal Server Error from {response.url}")
            try:
                page.close()
            except:
                pass

    page.on("response", handle_response)

    try:
        page.goto(f"{url}/tabletapp/")
        page.wait_for_load_state("networkidle")
        print(f"✅ Page opened: {page.url}")
    except Exception as e:
        print(f"❌ Failed to navigate to login page: {e}")
        return False

    try:
        # Fill phone
        page.get_by_placeholder("ID Number").fill(phone)
        page.get_by_role("button", name="Login").click()
        print("✅ Login form submitted")
    except Exception as e:
        print(f"❌ Failed to submit login form: {e}")
        return False

    try:
        # Wait for home page, which is /dashboard for tabletapp
        page.wait_for_url(f"**/dashboard")
        page.wait_for_load_state("networkidle")
        print("✅ Navigation to dashboard successful")
    except Exception as e:
        print(f"❌ Failed to reach dashboard: {e}")
        return False

    return True

def run_all_tests():
    with sync_playwright() as p:
        # Running browser in non-headless mode for visibility
        browser = p.chromium.launch(
            headless=False,
            slow_mo=1000
        )
        page = browser.new_page()
        print("✅ Browser opened")

        try:
            if not test_login(page, "1234567890", "567890"):
                print("❌ Login failed, aborting tests")
                return

            print("\n✅✅✅ All tests passed for Tablet App! ✅✅✅")

        finally:
            browser.close()
            print("✅ Browser closed")

if __name__ == "__main__":
    run_all_tests()
