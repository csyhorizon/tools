import base64
import sys

def decode_from_base64():
    """
    Function to decode a Base64 string back to plain text from user input.
    """
    print("--- Base64 Decoder ---")
    print("Please Input 'Base64 String' and Enter")
    print("(Type 'exit' or 'quit' to terminate the program)")
    print("-" * 20)

    while True:
        try:
            base64_string = input("Base64 String > ")

            # Program termination condition
            if not base64_string or base64_string.lower() in ['exit', 'quit']:
                print("Exiting the program.")
                break
            
            # Exception handling for invalid Base64 strings during decoding
            try:
                # 1. Convert the Base64 string to bytes
                base64_bytes = base64_string.encode('utf-8')

                # 2. Decode the Base64 bytes to original bytes
                plain_bytes = base64.b64decode(base64_bytes)

                # 3. Convert the original bytes back to string (plain text)
                plain_text = plain_bytes.decode('utf-8')
                
                print(f"Plain Text Result: {plain_text}\n")
                
            except base64.binascii.Error as e:
                # Handle invalid Base64 string format
                print(f"Decoding Error: Invalid Base64 string format. Please check your input. ({e})\n")
                continue # Skip to the next input

        except KeyboardInterrupt:
            # Handle Ctrl+C gracefully
            print("\nProgram is terminating...")
            break
        except Exception as e:
            print(f"please check to Err: {e}\n")

if __name__ == "__main__":
    decode_from_base64()