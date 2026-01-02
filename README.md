# POS System

## Add/Remove Items

Click an item to add it to the cart. After an item is added, each additional click increases its quantity by one

- Item quantity can also be adjusted or removed directly from the cart.
- The cart can be cleared using the button in the top-right corner. A confirmation dialog will appear.

## Parking Sales

Click “Park Sale” (under the orange “Payment” button) to park the current sale, a dialog will prompt for the customer’s name (required; minimum 3 characters).

- If the cart is empty, a “Retrieve Sale” button appears there instead, and it’s disabled when no parked sales exist.

## Completing a Sale

Click the orange **"Payment"** button to begin checkout. A payment-method dialog will appear — select the desired method to continue. After selecting a method you will be given three options:

- **Confirm Payment** — finalize the transaction and issue the receipt.
- **Change Payment** — return to the payment-method selector to choose or edit payment details.
- **Cancel Sale** — abort the current sale and return to the sales screen.

If the cart is empty, the **Payment** button is disabled.

## Hotkeys

### Cart-level hotkeys

Once an item is in the cart, the selected item can be controlled with hotkeys:

- `-` — decrease the item quantity by 1, or remove it if the quantity equals one
- `+` — increase the item quantity by 1
- `Delete` — remove the item from the cart
- `Arrow Up / Arrow Down / Arrow Left / Arrow Right` — navigate between items in the cart
- `Shift + Delete` / `Shift + Escape` — clear the entire cart.
  - `Enter`: confirm and clear the cart.
  - `Escape`: cancel and close the dialog.

When a new item is added, focus moves automatically to it (it becomes the selected item). Hotkeys always apply to the currently selected item, which is visually highlighted.

### Parked-sale hotkeys

- `P` — open the **Park Sale** dialog and autofocus the input field.

  - `Enter`: confirm and save the parked sale.
  - `Escape`: cancel and close the dialog.

- `R` — open the parked-sales list. Each parked sale is visually highlighted and assigned a number (`1–9`).

  - Press the sale’s number key (`1`–`9`) to retrieve that parked sale into the cart.
  - `Shift + <number (1–9)>` — prompt for confirmation, then dismiss (remove) the selected parked sale.

All modal dialogs support standardized keyboard shortcuts (and mouse clicks) for improved accessibility and workflow speed. The `Escape` key cancels the current operation and dismisses the popup. For single-choice operations (unlike parked sales list), the `Enter` key triggers the primary confirmation action.

### Payment hotkeys

- `Enter` — proceed to payment; open the **Payment** dialog. Inside the dialog:

  - Press `1`–`3` to choose the corresponding payment method (each method is labeled `1`, `2`, `3`).
  - After you select a method, press the same number again to confirm the payment and complete the transaction.
  - `Escape` — go back / close the payment dialog at any time.
