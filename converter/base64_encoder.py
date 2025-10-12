import base64
import sys

def encode_to_base64():
    print("--- Base64 Incoder ---")
    print("Please Input 'Text' and Enter")
    print("(Type 'exit' or 'quit' to terminate the program)")
    print("-" * 20)

    while True:
        try:
            plain_text = input("plain Text > ")

            # End the program if input is empty or user types 'exit' or 'quit'
            if not plain_text or plain_text.lower() in ['exit', 'quit']:
                print("Exiting the program.")
                break

            # 1. plain text is converted to bytes
            plain_bytes = plain_text.encode('utf-8')

            # 2. Bytes are encoded to Base64
            base64_bytes = base64.b64encode(plain_bytes)

            # 3. Bytes are converted back to string
            base64_string = base64_bytes.decode('utf-8')

            print(f"Base64 Result: {base64_string}\n")

        except KeyboardInterrupt:
            # Handle Ctrl+C gracefully
            print("\nProgram is terminating...")
            break
        except Exception as e:
            print(f"please check to Err: {e}\n")

if __name__ == "__main__":
    encode_to_base64()