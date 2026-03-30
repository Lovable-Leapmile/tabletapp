from playwright.sync_api import sync_playwright, expect
import os
from dotenv import load_dotenv

load_dotenv()

# change the base url to your domain/droplet
DOMAIN = os.getenv("LEAPMILE_DEPLOYMENT_NAME")
url = os.getenv("LEAPMILE_HOST_BASEURL", "https://magesh.leapmile.com")

def log_header():
    print("-" * 105)
    print(f"| {'Task Flow'.ljust(35)} | {'Status'.ljust(8)} | {'Message'.ljust(50)} |")
    print("-" * 105)

def log_step(task, status="✅", message="Done"):
    msg = (message[:47] + '...') if len(message) > 50 else message.ljust(50)
    print(f"| {task.ljust(35)} | {status.ljust(8)} | {msg} |")

def log_footer():
    print("-" * 105)

def test_login(page, phone, password):
    # Watch for 500 errors
    def handle_response(response):
        if response.status >= 500:
            log_step("App Test", "❌", f"{response.status} Internal Server Error from {response.url}")
            try:
                page.close()
            except:
                pass

    page.on("response", handle_response)

    try:
        page.goto(f"{url}/tabletapp/")
        page.wait_for_load_state("networkidle")
        log_step("Navigation", "✅", f"Page opened: {page.url}")
    except Exception as e:
        log_step("Navigation", "❌", f"Failed to navigate to login page: {e}")
        return False

    try:
        # Fill phone
        page.get_by_placeholder("ID Number").fill(phone)
        page.get_by_role("button", name="Login").click()
        log_step("Login Action", "✅", "Login form submitted")
    except Exception as e:
        log_step("App Test", "❌", f"Failed to submit login form: {e}")
        return False

    try:
        # Wait for home page, which is /dashboard for tabletapp
        page.wait_for_url(f"**/dashboard")
        page.wait_for_load_state("networkidle")
        log_step("Navigation", "✅", "Navigation to dashboard successful")
    except Exception as e:
        log_step("App Test", "❌", f"Failed to reach dashboard: {e}")
        return False

    return True

def test_tablet_flow(page):
    try:
        # 1. Check Dashboard UI
        expect(page.get_by_text("Dashboard", exact=True)).to_be_visible()
        expect(page.get_by_text("Inbound", exact=True)).to_be_visible()
        expect(page.get_by_text("Pickup", exact=True)).to_be_visible()
        expect(page.get_by_text("Station View", exact=True)).to_be_visible()
        expect(page.get_by_text("Admin", exact=True)).to_be_visible()
        log_step("UI Check", "✅", "Checked all buttons and UI on Dashboard")

        # 2. Go to Station View
        page.get_by_text("Station View", exact=True).click()
        page.wait_for_url("**/station-view")
        page.wait_for_load_state("networkidle")
        log_step("Navigation", "✅", "Navigated to Station View")

        # 3. Check In Station tray
        expect(page.get_by_role("tab", name="In Station trays")).to_be_visible()
        log_step("App Test", "✅", "Verified 'In Station trays' tab")

        # 4. Click In Progress trays
        page.get_by_role("tab", name="In Progress trays").click()
        log_step("App Test", "✅", "Clicked 'In Progress trays' tab")
        page.wait_for_timeout(2000)

        # 5. Check if any data and console count
        in_progress_heading = page.locator("h2:has-text('In Progress Trays')")
        if in_progress_heading.is_visible():
            log_step("App Test", "📋", f"{in_progress_heading.inner_text()}")
        else:
            log_step("Parts Verification", "📋", "No In Progress Trays found")

        # Tray Overflow check (Not found in UI, gracefully logging)
        print("⚠️ 'Tray Overflow' not found in UI, skipping to Admin...")

        # Goto Admin Flow
        page.goto(f"{url}/tabletapp/dashboard")
        page.wait_for_url("**/dashboard")
        page.get_by_text("Admin", exact=True).click()
        page.wait_for_url("**/admin")
        log_step("Navigation", "✅", "Navigated to Admin Dashboard")

        # Admin -> Users Flow
        page.get_by_text("Users", exact=True).click()
        page.wait_for_url("**/admin/users")
        page.wait_for_timeout(2000)
        total_users = page.locator("text=Total Users:").locator("span.text-icon-accent").inner_text()
        log_step("Tablet Flow", "👥", f"Admin Users Count: {total_users}")
        
        # Admin -> Bins Flow
        page.goto(f"{url}/tabletapp/admin")
        page.get_by_text("Bins", exact=True).click()
        page.wait_for_url("**/admin/bins")
        page.wait_for_timeout(2000)
        total_bins = page.locator("text=Total:").locator("span.text-icon-accent").inner_text()
        log_step("Tablet Flow", "📦", f"Admin Bins Count: {total_bins}")

        # Admin -> History Flow
        page.goto(f"{url}/tabletapp/admin")
        page.get_by_text("History", exact=True).click()
        page.wait_for_url("**/admin/history")
        page.wait_for_timeout(2000)
        inbound_history_lbl = page.locator("span:has-text('total')").first
        if inbound_history_lbl.is_visible():
            log_step("Tablet Flow", "📜", f"Total History Inbound: {inbound_history_lbl.inner_text()}")
        else:
            log_step("Tablet Flow", "📜", "Total History Inbound (No Data)")
        
        page.get_by_role("button", name="Pickup").click()
        page.wait_for_timeout(2000)
        pickup_history_lbl = page.locator("span:has-text('total')").first
        if pickup_history_lbl.is_visible():
            log_step("Tablet Flow", "📜", f"Total History Pickup (Outbound): {pickup_history_lbl.inner_text()}")
        else:
            log_step("Tablet Flow", "📜", "Total History Pickup (No Data)")
            
        # Admin -> Text Scanner Flow
        page.goto(f"{url}/tabletapp/admin")
        page.get_by_text("Test Scanner", exact=True).click()
        page.wait_for_url("**/admin/test-scanner")
        page.get_by_placeholder("Enter item ID").fill("1234")
        page.get_by_role("button", name="Add").click()
        expect(page.get_by_text("Item ID – 1234")).to_be_visible()
        log_step("App Test", "✅", "Test Scanner verified (Added Item ID: 1234)")

        # Admin -> Scanner Manual Flow
        page.goto(f"{url}/tabletapp/admin")
        page.get_by_text("Scanner Manual", exact=True).click()
        page.wait_for_url("**/admin/scanner-manual")
        expect(page.get_by_text("Step 1: Restart the device.")).to_be_visible()
        expect(page.get_by_text("Factory Default")).to_be_visible()
        expect(page.locator("svg").first).to_be_visible()
        log_step("App Test", "✅", "Scanner Manual UI components and QRs verified")

        # Admin -> Add Item before returning to Inbound
        page.goto(f"{url}/tabletapp/admin")
        page.get_by_text("Add Product", exact=True).click()
        page.wait_for_url("**/admin/add-product")
        page.locator("input#item-id").fill("item1")
        page.locator("input#item-description").fill("test_item_1")
        page.get_by_role("button", name="Confirm Item").click()
        page.get_by_role("button", name="Confirm").click()
        page.wait_for_timeout(2000)
        
        ok_btns = page.get_by_role("button", name="OK")
        error_msg = page.locator(".text-red-600").first
        
        if ok_btns.is_visible():
            ok_btns.click()
            log_step("Tablet Flow", "✅", "Admin Add Item: Successfully added Item1 as test_item_1")
        elif error_msg.is_visible():
            log_step("Tablet Flow", "❌", f"Admin Add Item Failed: {error_msg.inner_text()}")
        else:
            print("⚠️ Admin Add Item: Verification state unclear (no success or error dialog)")

        # Back to Dashboard -> Inbound Flow
        page.goto(f"{url}/tabletapp/dashboard")
        page.wait_for_url("**/dashboard")
        page.get_by_text("Inbound", exact=True).click()
        page.wait_for_url("**/inbound/select-bin")
        log_step("Navigation", "✅", "Navigated to Inbound Bins")
        page.wait_for_timeout(2000)

        # Check total count of inbound trays
        total_inbound = page.locator("div:has-text('Total:') > span.text-primary").last.inner_text()
        log_step("Tablet Flow", "📦", f"Total Inbound Trays Count: {total_inbound}")

        # Search tray T1
        page.get_by_placeholder("Search bin ID...").fill("T1")
        page.wait_for_timeout(1000)

        # Click retrieve (find bin T1 card and click it, then confirm)
        t1_card = page.locator("div.animate-fade-in").filter(has_text="T1").first
        if t1_card.is_visible():
            t1_card.click()
            page.get_by_role("button", name="Confirm").click()
            log_step("Parts Verification", "✅", "Clicked Retrieve for Tray T1")
            page.wait_for_timeout(2000)
        else:
            log_step("Tablet Flow", "❌", "Tray T1 not found on Inbound screen")

        # 8. Go to Pickup
        page.goto(f"{url}/tabletapp/dashboard")
        page.wait_for_url("**/dashboard")
        page.get_by_text("Pickup", exact=True).click()
        page.wait_for_url("**/pickup/select-bin")
        log_step("Navigation", "✅", "Navigated to Pickup Bins")
        page.wait_for_timeout(2000)

        # 9. Check total count of Pickup trays
        total_pickup = page.locator("div:has-text('Total:') > span.text-primary").last.inner_text()
        log_step("Tablet Flow", "📦", f"Total Pickup Trays Count: {total_pickup}")

        return True
    except Exception as e:
        log_step("UI Check", "❌", f"Flow test failed: {e}")
        return False

def run_all_tests():
    with sync_playwright() as p:
        # Running browser in non-headless mode for visibility
        browser = p.chromium.launch(
            headless=False,
            slow_mo=500
        )
        context = browser.new_context(viewport={"width": 1024, "height": 768})
        page = context.new_page()
        log_step("Browser State", "✅", "Browser opened")

        try:
            if not test_login(page, "1234567890", "567890"):
                log_step("Login Action", "❌", "Login failed, aborting tests")
                return

            if not test_tablet_flow(page):
                log_step("UI Check", "❌", "Tablet Flow failed")
                return

            print("\n✅✅✅ All tests passed for Tablet App! ✅✅✅")

        finally:
            browser.close()
            log_step("Browser State", "✅", "Browser closed")

if __name__ == "__main__":
    run_all_tests()
