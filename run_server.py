import http.server
import socketserver
import webbrowser
import os
import sys

# Define port
PORT = 8000

# Get directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))

# Change working directory to the script's directory
os.chdir(script_dir)

# Handler to serve files
Handler = http.server.SimpleHTTPRequestHandler

print(f"Starting server for your Portfolio...")
print(f"Point your browser to: http://localhost:{PORT}")

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        # Open browser automatically
        webbrowser.open(f"http://localhost:{PORT}")
        print("Press Ctrl+C to stop the server.")
        httpd.serve_forever()
except KeyboardInterrupt:
    print("\nServer stopped. Thank you!")
    sys.exit(0)
except Exception as e:
    print(f"Error starting server: {e}")
    print("You can also view the portfolio by simply double-clicking 'index.html' in this directory.")
    sys.exit(1)
