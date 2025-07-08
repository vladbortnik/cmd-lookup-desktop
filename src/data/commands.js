/**
 * TL;DR Commands Database
 * 
 * A comprehensive collection of Unix/Linux commands with descriptions, examples,
 * platform support information, and categorization. Commands are alphabetically
 * sorted for consistent ordering and include practical usage examples.
 * 
 * @fileoverview Command database for the TL;DR application
 * @version 1.0.0
 * @created 2025-07-01
 * @updated 2025-07-06
 */

/**
 * Main commands database containing 80 unique Unix/Linux commands
 * Each command includes name, description, examples, platform support, and category
 * 
 * @type {Array<Object>}
 * @property {string} name - Command name (e.g., 'ls', 'grep')
 * @property {string} standsFor - What the command abbreviation means
 * @property {string} description - Brief explanation of command purpose
 * @property {Array<string>} examples - Practical usage examples with comments
 * @property {Array<string>} platform - Supported platforms ['linux', 'mac', 'windows']
 * @property {string} category - Command category for organization
 */
const commandsDatabase = [
  {
    "name": "alias",
    "standsFor": "command alias",
    "description": "Creates shortcuts for commonly used commands",
    "examples": [
      "alias ll='ls -la'     # Create an alias",
      "alias                # List all aliases",
      "unalias ll           # Remove an alias",
      "alias -p > ~/.aliases # Save aliases to a file"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "shell"
  },
  {
    "name": "ansible",
    "standsFor": "ansible automation platform",
    "description": "Configuration management and application deployment tool",
    "examples": [
      "ansible all -m ping                         # Ping all hosts",
      "ansible host -m setup                       # Get facts about hosts",
      "ansible-playbook playbook.yml               # Run a playbook",
      "ansible-galaxy install username.rolename    # Install a role"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "automation"
  },
  {
    "name": "apt",
    "standsFor": "advanced package tool",
    "description": "Package management utility for Debian-based distributions",
    "examples": [
      "apt update             # Update package lists",
      "apt upgrade            # Upgrade installed packages",
      "apt install package    # Install package",
      "apt remove package     # Remove package"
    ],
    "platform": [
      "linux"
    ],
    "category": "package-management"
  },
  {
    "name": "awk",
    "standsFor": "Aho Weinberger and Kernighan",
    "description": "A versatile programming language for working with text files",
    "examples": [
      "awk '{print $1}' file.txt  # Print first column",
      "awk -F':' '{print $1}' /etc/passwd  # Use custom delimiter",
      "awk '/pattern/ {print $0}' file.txt  # Print lines matching pattern",
      "awk '{sum += $1} END {print sum}' file.txt  # Sum first column"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "text-processing"
  },
  {
    "name": "bash",
    "standsFor": "Bourne Again SHell",
    "description": "GNU Bourne Again SHell, a command-line interpreter",
    "examples": [
      "bash script.sh         # Run a script file",
      "bash -c \"echo Hello\"    # Execute command in bash",
      "bash -n script.sh      # Check script syntax without execution",
      "bash -x script.sh      # Print commands during execution"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "shell"
  },
  {
    "name": "brew",
    "standsFor": "Homebrew package manager",
    "description": "Package manager for macOS",
    "examples": [
      "brew install package   # Install a package",
      "brew update            # Update brew and all formulae",
      "brew upgrade           # Upgrade all installed packages",
      "brew list              # List installed packages"
    ],
    "platform": [
      "mac"
    ],
    "category": "package-management"
  },
  {
    "name": "cat",
    "standsFor": "concatenate and print files",
    "description": "Print and concatenate files",
    "examples": [
      "cat file.txt           # Display file content",
      "cat file1.txt file2.txt  # Concatenate and display",
      "cat > file.txt         # Write to file (Ctrl+D to save)",
      "cat file.txt | grep pattern  # Find pattern in file"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "cd",
    "standsFor": "change directory",
    "description": "Change the current working directory",
    "examples": [
      "cd /path/to/directory  # Change to specific directory",
      "cd ~                  # Change to home directory",
      "cd ..                 # Go up one directory",
      "cd -                  # Go to previous directory"
    ],
    "platform": [
      "linux",
      "mac",
      "windows"
    ],
    "category": "file-operations"
  },
  {
    "name": "chmod",
    "standsFor": "change mode",
    "description": "Change file mode (permissions)",
    "examples": [
      "chmod +x script.sh     # Make file executable",
      "chmod 755 file.txt     # Set specific permissions (rwx for owner, rx for group and others)",
      "chmod -R 755 dir/      # Recursive permission change",
      "chmod u=rwx,g=rx,o=r file  # Set specific permissions by user categories"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "chown",
    "standsFor": "change owner",
    "description": "Change file owner and group",
    "examples": [
      "chown user file.txt   # Change file owner",
      "chown user:group file.txt  # Change owner and group",
      "chown -R user directory/   # Recursively change ownership",
      "chown --reference=file1 file2  # Use same owner as file1"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "cp",
    "standsFor": "copy",
    "description": "Copy files and directories",
    "examples": [
      "cp file.txt copy.txt  # Copy a file",
      "cp -r dir1/ dir2/     # Copy directory recursively",
      "cp -i file.txt dest/  # Prompt before overwrite",
      "cp -a source/ dest/   # Archive mode (preserve attributes)"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "cron",
    "standsFor": "chronological job scheduler",
    "description": "Job scheduling utility in Unix-like systems",
    "examples": [
      "cron                  # The cron daemon",
      "systemctl status cron # Check cron service status",
      "systemctl enable cron # Enable cron service",
      "systemctl restart cron # Restart cron service"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "crontab",
    "standsFor": "chronograph table",
    "description": "Schedule cron jobs to run on a time interval",
    "examples": [
      "crontab -l            # List cron jobs",
      "crontab -e            # Edit cron jobs",
      "crontab file          # Set crontab from file",
      "crontab -r            # Remove all cron jobs"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "curl",
    "standsFor": "client URL",
    "description": "Transfer data from or to a server",
    "examples": [
      "curl https://example.com  # Get contents of URL",
      "curl -o file.html https://example.com  # Save to file",
      "curl -X POST -d 'data' URL  # Send POST request",
      "curl -H 'Header: Value' URL  # Send with custom header"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "networking"
  },
  {
    "name": "cut",
    "standsFor": "cut out fields",
    "description": "Cut out sections from lines of files",
    "examples": [
      "cut -d':' -f1 /etc/passwd  # Cut first field using : delimiter",
      "cut -c1-5 file.txt         # Cut characters 1-5 from each line",
      "cut -b1-5 file.txt         # Cut bytes 1-5 from each line",
      "echo 'hello' | cut -c1-3    # Cut from a pipe"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "text-processing"
  },
  {
    "name": "date",
    "standsFor": "date and time",
    "description": "Display or set the system date and time",
    "examples": [
      "date                   # Show current date and time",
      "date +\"%Y-%m-%d\"        # Custom format date (YYYY-MM-DD)",
      "date -d \"yesterday\"    # Show yesterday's date",
      "date -u                # Show UTC time"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "dd",
    "standsFor": "data duplicator",
    "description": "Convert and copy a file",
    "examples": [
      "dd if=/dev/zero of=file.txt bs=1M count=10  # Create 10MB file",
      "dd if=/dev/sda of=/dev/sdb                  # Clone disk",
      "dd if=image.iso of=/dev/usb                 # Write ISO to USB",
      "dd if=/dev/urandom of=file bs=1M count=1    # Random data file"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "df",
    "standsFor": "disk free",
    "description": "Report file system disk space usage",
    "examples": [
      "df -h                # Show disk space in human-readable format",
      "df -i                # Show inode information",
      "df -T                # Show file system type",
      "df -h /home          # Check space for specific mount point"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "diff",
    "standsFor": "difference",
    "description": "Compare files line by line",
    "examples": [
      "diff file1 file2     # Compare two files",
      "diff -u file1 file2  # Unified format output",
      "diff -r dir1/ dir2/  # Compare directories recursively",
      "diff -y file1 file2  # Side-by-side output"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "dig",
    "standsFor": "domain information groper",
    "description": "DNS lookup utility",
    "examples": [
      "dig example.com        # Query DNS for address",
      "dig -x 8.8.8.8        # Reverse DNS lookup",
      "dig +short example.com # Get just the IP address",
      "dig example.com MX     # Look up mail servers"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "networking"
  },
  {
    "name": "docker",
    "standsFor": "docker container tool",
    "description": "Container management platform",
    "examples": [
      "docker run image       # Run a container",
      "docker ps              # List running containers",
      "docker build -t name .  # Build image from Dockerfile",
      "docker stop container  # Stop a container"
    ],
    "platform": [
      "linux",
      "mac",
      "windows"
    ],
    "category": "containers"
  },
  {
    "name": "du",
    "standsFor": "disk usage",
    "description": "Estimate file space usage",
    "examples": [
      "du -sh dir/            # Summarize directory size in human-readable form",
      "du -h --max-depth=1 /  # Show size of top-level directories",
      "du -a                  # Show size of all files and directories",
      "du -h *.log            # Check size of log files"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "echo",
    "standsFor": "echo (display text)",
    "description": "Print text to the terminal",
    "examples": [
      "echo \"Hello World\"      # Print text",
      "echo $VARIABLE         # Print variable value",
      "echo -e \"Line1\nLine2\"  # Interpret backslash escapes",
      "echo \"Text\" > file.txt  # Write text to file"
    ],
    "platform": [
      "linux",
      "mac",
      "windows"
    ],
    "category": "shell"
  },
  {
    "name": "env",
    "standsFor": "environment",
    "description": "Display, set, or remove environment variables",
    "examples": [
      "env                  # Display all environment variables",
      "env VAR=value command # Run command with environment variable set",
      "env -i command       # Run command with empty environment",
      "env --unset=VAR command # Run command with variable removed"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "export",
    "standsFor": "export variable",
    "description": "Set environment variables for child processes",
    "examples": [
      "export VAR=value     # Export a new variable",
      "export VAR           # Export an existing variable",
      "export -p            # Display all exported variables",
      "export -n VAR        # Convert variable to local"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "shell"
  },
  {
    "name": "file",
    "standsFor": "file type",
    "description": "Determine file type",
    "examples": [
      "file filename        # Show file type",
      "file -b filename     # Brief mode, no filename",
      "file -i filename     # Show MIME type",
      "file -z file.gz      # Look inside compressed files"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "find",
    "standsFor": "find files",
    "description": "Search for files in a directory hierarchy",
    "examples": [
      "find . -name \"*.txt\"  # Find all .txt files",
      "find . -type d        # Find all directories",
      "find . -mtime -7      # Files modified in last 7 days",
      "find . -size +10M     # Files larger than 10MB"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "git",
    "standsFor": "global information tracker",
    "description": "Distributed version control system",
    "examples": [
      "git init              # Initialize repository",
      "git clone url         # Clone a repository",
      "git add file          # Add file to staging",
      "git commit -m 'msg'   # Commit changes"
    ],
    "platform": [
      "linux",
      "mac",
      "windows"
    ],
    "category": "development"
  },
  {
    "name": "grep",
    "standsFor": "global regular expression print",
    "description": "Search for patterns in files",
    "examples": [
      "grep pattern file     # Search for pattern in file",
      "grep -r pattern dir/  # Search recursively in directory",
      "grep -i pattern file  # Case insensitive search",
      "grep -v pattern file  # Show lines that don't match"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "text-processing"
  },
  {
    "name": "gzip",
    "standsFor": "GNU zip",
    "description": "Compress or decompress files with gzip compression",
    "examples": [
      "gzip file.txt          # Compress file (creates file.txt.gz)",
      "gzip -d file.txt.gz    # Decompress file",
      "gzip -9 file.txt       # Use maximum compression",
      "gzip -k file.txt       # Keep the original file"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "head",
    "standsFor": "head of file",
    "description": "Output the first part of files",
    "examples": [
      "head file.txt        # Show first 10 lines",
      "head -n 20 file.txt  # Show first 20 lines",
      "head -c 100 file.txt # Show first 100 bytes",
      "head -q file1 file2  # Don't show filenames"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "text-processing"
  },
  {
    "name": "history",
    "standsFor": "command history",
    "description": "Show command history",
    "examples": [
      "history                # Show command history",
      "history 10             # Show last 10 commands",
      "!42                    # Execute command number 42",
      "history -c             # Clear history"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "shell"
  },
  {
    "name": "ifconfig",
    "standsFor": "interface configuration",
    "description": "Configure network interfaces",
    "examples": [
      "ifconfig               # Display all interfaces",
      "ifconfig eth0 up       # Enable eth0 interface",
      "ifconfig eth0 down     # Disable eth0 interface",
      "ifconfig eth0 192.168.1.1 netmask 255.255.255.0  # Set IP"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "networking"
  },
  {
    "name": "ip",
    "standsFor": "internet protocol",
    "description": "Show / manipulate routing, devices, policy routing",
    "examples": [
      "ip addr show         # Show IP addresses",
      "ip link show         # Show network interfaces",
      "ip route show        # Show routing table",
      "ip neigh show        # Show neighbor table"
    ],
    "platform": [
      "linux"
    ],
    "category": "networking"
  },
  {
    "name": "journalctl",
    "standsFor": "journal control",
    "description": "Query the systemd journal",
    "examples": [
      "journalctl           # Show all logs",
      "journalctl -u service # Show logs for a service",
      "journalctl -f        # Follow new messages",
      "journalctl --since today # Today's logs"
    ],
    "platform": [
      "linux"
    ],
    "category": "system"
  },
  {
    "name": "jq",
    "standsFor": "JSON query",
    "description": "Command-line JSON processor",
    "examples": [
      "jq '.' file.json     # Pretty-print JSON",
      "jq '.key' file.json  # Extract a specific field",
      "jq '.[] | select(.id == 1)' # Filter array",
      "curl api | jq '.results[]'  # Process API output"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "data-processing"
  },
  {
    "name": "kill",
    "standsFor": "kill process",
    "description": "Send a signal to a process",
    "examples": [
      "kill 1234           # Send TERM signal to PID 1234",
      "kill -9 1234        # Send KILL signal (force quit)",
      "kill -l             # List available signals",
      "kill -HUP 1234      # Send HUP signal (reload config)"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "less",
    "standsFor": "less is more",
    "description": "View file content with backward movement",
    "examples": [
      "less file.txt        # View file",
      "less -N file.txt     # Show line numbers",
      "less +G file.txt     # Start at end of file",
      "less +/pattern file  # Search for pattern"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "text-processing"
  },
  {
    "name": "ln",
    "standsFor": "link",
    "description": "Make links between files",
    "examples": [
      "ln -s target link    # Create symbolic link",
      "ln file1 file2       # Create hard link",
      "ln -sf target link   # Force symbolic link",
      "ln -sr file1 dir/    # Create relative symbolic link"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "locate",
    "standsFor": "locate files",
    "description": "Find files by name using a prebuilt index",
    "examples": [
      "locate file.txt        # Find all instances of file.txt",
      "locate -i FILENAME     # Case insensitive search",
      "locate -l 10 pattern   # Limit to 10 results",
      "updatedb               # Update the file database"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "ls",
    "standsFor": "list",
    "description": "List directory contents",
    "examples": [
      "ls                    # List files and directories",
      "ls -la                # List all files with detailed info",
      "ls -lh                # List with human-readable file sizes",
      "ls *.txt              # List only .txt files"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "lsof",
    "standsFor": "list open files",
    "description": "List open files",
    "examples": [
      "lsof                # List all open files",
      "lsof -i :80         # Show processes using port 80",
      "lsof -u username    # Files opened by user",
      "lsof /path/to/file  # Processes using specific file"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "man",
    "standsFor": "manual",
    "description": "Display system reference manuals",
    "examples": [
      "man command         # Show manual for command",
      "man -k keyword      # Search for commands by keyword",
      "man 5 passwd        # Show manual for passwd file format",
      "man -f command      # Show one-line description"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "mkdir",
    "standsFor": "make directory",
    "description": "Create directories",
    "examples": [
      "mkdir dir           # Create directory",
      "mkdir -p parent/child # Create parent directories as needed",
      "mkdir -m 755 dir    # Create with specific permissions",
      "mkdir dir1 dir2     # Create multiple directories"
    ],
    "platform": [
      "linux",
      "mac",
      "windows"
    ],
    "category": "file-operations"
  },
  {
    "name": "mv",
    "standsFor": "move",
    "description": "Move or rename files",
    "examples": [
      "mv file1 file2      # Rename file1 to file2",
      "mv file dir/        # Move file to directory",
      "mv -i file1 file2   # Prompt before overwrite",
      "mv dir1/ dir2/      # Move or rename directory"
    ],
    "platform": [
      "linux",
      "mac",
      "windows"
    ],
    "category": "file-operations"
  },
  {
    "name": "nc",
    "standsFor": "netcat",
    "description": "Networking utility for reading/writing across network connections",
    "examples": [
      "nc -l 8080           # Listen on port 8080",
      "nc host.example.com 8080  # Connect to host:port",
      "nc -z host.example.com 22  # Port scanning",
      "nc -v host.example.com 80  # Verbose connection"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "networking"
  },
  {
    "name": "netstat",
    "standsFor": "network statistics",
    "description": "Display network connections and statistics",
    "examples": [
      "netstat -a             # Show all connections",
      "netstat -tuln          # Show listening TCP/UDP ports",
      "netstat -rn            # Show routing table",
      "netstat -s             # Show statistics by protocol"
    ],
    "platform": [
      "linux",
      "mac",
      "windows"
    ],
    "category": "networking"
  },
  {
    "name": "nice",
    "standsFor": "nice process priority",
    "description": "Run a program with modified scheduling priority",
    "examples": [
      "nice -n 10 command    # Run with lower priority (nice value 10)",
      "nice command          # Run with default lower priority",
      "nice -n -10 command   # Run with higher priority (requires root)",
      "nice -n 19 command    # Run with lowest priority"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "nmap",
    "standsFor": "network mapper",
    "description": "Network exploration tool and security scanner",
    "examples": [
      "nmap 192.168.0.1       # Scan a single host",
      "nmap 192.168.0.1-100   # Scan a range of IPs",
      "nmap -p 80,443 host    # Scan specific ports",
      "nmap -sV host          # Detect service versions"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "networking"
  },
  {
    "name": "npm",
    "standsFor": "node package manager",
    "description": "JavaScript and Node.js package manager",
    "examples": [
      "npm install package    # Install a package",
      "npm install -g package # Install globally",
      "npm init               # Create package.json",
      "npm run script         # Run script from package.json"
    ],
    "platform": [
      "linux",
      "mac",
      "windows"
    ],
    "category": "development"
  },
  {
    "name": "nslookup",
    "standsFor": "name server lookup",
    "description": "Query DNS records",
    "examples": [
      "nslookup example.com  # Query A record",
      "nslookup -type=mx example.com  # Query MX records",
      "nslookup -type=txt example.com  # Query TXT records",
      "nslookup example.com ns1.example.com  # Use specific nameserver"
    ],
    "platform": [
      "linux",
      "mac",
      "windows"
    ],
    "category": "networking"
  },
  {
    "name": "openssl",
    "standsFor": "open secure sockets layer",
    "description": "Cryptography toolkit",
    "examples": [
      "openssl genrsa -out key.pem 2048  # Generate RSA key",
      "openssl req -new -key key.pem -out csr.pem  # Generate CSR",
      "openssl x509 -in cert.pem -text   # View certificate",
      "openssl s_client -connect example.com:443  # Test SSL/TLS connection"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "security"
  },
  {
    "name": "passwd",
    "standsFor": "password",
    "description": "Change user password",
    "examples": [
      "passwd                 # Change your password",
      "passwd username        # Change another user's password (as root)",
      "passwd -l username     # Lock a user account",
      "passwd -u username     # Unlock a user account"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "pgrep",
    "standsFor": "process grep",
    "description": "Find processes by name",
    "examples": [
      "pgrep firefox       # Find Firefox process IDs",
      "pgrep -u root      # Find processes by user",
      "pgrep -l apache    # List process names and IDs",
      "pgrep -x bash      # Exact match for process name"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "ping",
    "standsFor": "packet internet groper",
    "description": "Send ICMP ECHO_REQUEST to network hosts",
    "examples": [
      "ping example.com    # Ping host continuously",
      "ping -c 5 example.com  # Send 5 ping packets",
      "ping -i 2 example.com  # Ping every 2 seconds",
      "ping -s 1000 example.com  # Send larger packets"
    ],
    "platform": [
      "linux",
      "mac",
      "windows"
    ],
    "category": "networking"
  },
  {
    "name": "pkill",
    "standsFor": "process kill",
    "description": "Signal processes based on name and attributes",
    "examples": [
      "pkill firefox       # Kill all Firefox processes",
      "pkill -9 process    # Force kill with SIGKILL",
      "pkill -u username   # Kill processes by user",
      "pkill -f pattern    # Match against full command line"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "ps",
    "standsFor": "process status",
    "description": "Display information about active processes",
    "examples": [
      "ps                 # Show current user processes",
      "ps aux             # Show all processes in detail",
      "ps -ef             # Show all processes (full format)",
      "ps -u username     # Show user's processes"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "pwd",
    "standsFor": "print working directory",
    "description": "Print name of current/working directory",
    "examples": [
      "pwd                # Show current directory",
      "pwd -P             # Show physical path (resolve symlinks)",
      "dirname $(pwd)     # Show parent directory",
      "echo $PWD          # Using shell variable"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "rm",
    "standsFor": "remove",
    "description": "Remove files or directories",
    "examples": [
      "rm file.txt            # Remove a file",
      "rm -r dir/             # Remove directory recursively",
      "rm -f file.txt         # Force remove without confirmation",
      "rm -i *.txt            # Remove with confirmation for each file"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "route",
    "standsFor": "routing table",
    "description": "Show or manipulate IP routing table",
    "examples": [
      "route                # Display routing table",
      "route add -net 192.168.1.0/24 gw 10.0.0.1  # Add route",
      "route del -net 192.168.1.0/24  # Delete route",
      "route -n             # Show numerical addresses"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "networking"
  },
  {
    "name": "rsync",
    "standsFor": "remote synchronize",
    "description": "A fast, versatile file copying tool",
    "examples": [
      "rsync -a source/ dest/   # Sync directories preserving attributes",
      "rsync -avz source/ user@host:dest/  # Remote sync with compression",
      "rsync -avh --progress source/ dest/  # Show progress",
      "rsync -av --delete source/ dest/     # Delete files that don't exist in source"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "scp",
    "standsFor": "secure copy",
    "description": "Securely copy files between hosts",
    "examples": [
      "scp file.txt user@host:path/  # Copy to remote host",
      "scp user@host:file.txt local/  # Copy from remote host",
      "scp -r dir/ user@host:path/  # Copy directory recursively",
      "scp -P 2222 file.txt user@host:  # Use specific port"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "networking"
  },
  {
    "name": "screen",
    "standsFor": "screen manager",
    "description": "Terminal multiplexer with VT100/ANSI terminal emulation",
    "examples": [
      "screen              # Start a new screen session",
      "screen -S name      # Start a named session",
      "screen -r           # Resume detached session",
      "screen -ls          # List running sessions"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "terminal"
  },
  {
    "name": "sed",
    "standsFor": "stream editor",
    "description": "Edit text in a scripted manner",
    "examples": [
      "sed 's/old/new/' file  # Replace first occurrence",
      "sed 's/old/new/g' file  # Replace all occurrences",
      "sed -i 's/old/new/g' file  # Edit file in-place",
      "sed '1,5d' file      # Delete lines 1-5"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "text-processing"
  },
  {
    "name": "sort",
    "standsFor": "sort lines",
    "description": "Sort lines of text files",
    "examples": [
      "sort file.txt       # Sort file",
      "sort -r file.txt     # Sort in reverse",
      "sort -n file.txt     # Sort numerically",
      "sort -k 2 file.txt   # Sort by second column"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "text-processing"
  },
  {
    "name": "ssh",
    "standsFor": "secure shell",
    "description": "Remote login client for SSH protocol",
    "examples": [
      "ssh user@host          # Connect to host as user",
      "ssh -p 2222 user@host  # Connect to specific port",
      "ssh -i key.pem user@host  # Use identity file",
      "ssh -X user@host       # Enable X11 forwarding"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "networking"
  },
  {
    "name": "stat",
    "standsFor": "file status",
    "description": "Display file or filesystem status",
    "examples": [
      "stat file.txt       # Show file status",
      "stat -c '%U' file.txt  # Show owner",
      "stat -f /mount/point  # Show filesystem info",
      "stat -t file.txt     # Terse output format"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "sudo",
    "standsFor": "superuser do",
    "description": "Execute a command as a different user (typically with elevated privileges)",
    "examples": [
      "sudo command        # Run command as root",
      "sudo -u user command  # Run as specified user",
      "sudo -s            # Start a shell as root",
      "sudo -l            # List allowed commands"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "systemctl",
    "standsFor": "system control",
    "description": "Control the systemd system and service manager",
    "examples": [
      "systemctl status service  # Check service status",
      "systemctl start service   # Start a service",
      "systemctl enable service  # Enable at boot",
      "systemctl restart service # Restart a service"
    ],
    "platform": [
      "linux"
    ],
    "category": "system"
  },
  {
    "name": "tail",
    "standsFor": "tail of file",
    "description": "Output the last part of files",
    "examples": [
      "tail file.txt       # Show last 10 lines",
      "tail -n 20 file.txt  # Show last 20 lines",
      "tail -f file.txt     # Follow file content as it grows",
      "tail -f -n0 file.txt | grep pattern  # Monitor for pattern"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "text-processing"
  },
  {
    "name": "tar",
    "standsFor": "tape archive",
    "description": "Archiving utility",
    "examples": [
      "tar -cf archive.tar files/  # Create archive",
      "tar -xf archive.tar        # Extract archive",
      "tar -czf archive.tar.gz files/  # Create gzipped archive",
      "tar -xzf archive.tar.gz    # Extract gzipped archive"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "tcpdump",
    "standsFor": "TCP dump",
    "description": "Dump network traffic",
    "examples": [
      "tcpdump -i eth0     # Capture on interface eth0",
      "tcpdump port 80      # Capture HTTP traffic",
      "tcpdump host example.com  # Capture traffic to/from host",
      "tcpdump -w capture.pcap  # Write to file"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "networking"
  },
  {
    "name": "touch",
    "standsFor": "touch file timestamp",
    "description": "Change file timestamps or create empty files",
    "examples": [
      "touch file.txt      # Create empty file/update timestamp",
      "touch -a file.txt    # Change access time only",
      "touch -m file.txt    # Change modification time only",
      "touch -t 202001010000 file.txt  # Set specific timestamp"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "file-operations"
  },
  {
    "name": "traceroute",
    "standsFor": "trace route",
    "description": "Print the route packets take to a network host",
    "examples": [
      "traceroute example.com  # Trace route to host",
      "traceroute -m 10 example.com  # Set max hops",
      "traceroute -T example.com  # Use TCP packets",
      "traceroute -4 example.com  # Force IPv4"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "networking"
  },
  {
    "name": "tty",
    "standsFor": "teletype",
    "description": "Print the file name of the terminal connected to stdin",
    "examples": [
      "tty                 # Show current terminal",
      "tty -s && echo terminal  # Silent mode for scripts",
      "echo $TTY           # Alternative using shell variable",
      "who                 # Show all tty sessions"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "uname",
    "standsFor": "unix name",
    "description": "Print system information",
    "examples": [
      "uname               # Print kernel name",
      "uname -a            # Print all information",
      "uname -r            # Print kernel release",
      "uname -m            # Print machine hardware name"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "uniq",
    "standsFor": "unique",
    "description": "Report or filter out repeated lines",
    "examples": [
      "uniq file.txt       # Remove duplicate adjacent lines",
      "uniq -c file.txt     # Count occurrences",
      "uniq -d file.txt     # Only print duplicate lines",
      "sort file.txt | uniq  # Remove all duplicates"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "text-processing"
  },
  {
    "name": "uptime",
    "standsFor": "up time",
    "description": "Show how long the system has been running",
    "examples": [
      "uptime              # Show uptime and load",
      "uptime -p           # Show uptime in pretty format",
      "uptime -s           # Show system up since",
      "w                   # Show uptime and logged-in users"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "system"
  },
  {
    "name": "vim",
    "standsFor": "vi improved",
    "description": "Text editor with many command modes",
    "examples": [
      "vim file.txt           # Open/create a file",
      "vim +10 file.txt       # Open file at line 10",
      "vim -R file.txt        # Open file in read-only mode",
      "vim -d file1 file2     # Open in diff mode"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "text-editing"
  },
  {
    "name": "wc",
    "standsFor": "word count",
    "description": "Count lines, words, and bytes",
    "examples": [
      "wc file.txt         # Count lines, words, bytes",
      "wc -l file.txt       # Count lines only",
      "wc -w file.txt       # Count words only",
      "wc -c file.txt       # Count bytes only"
    ],
    "platform": [
      "linux",
      "mac"
    ],
    "category": "text-processing"
  }
];

/**
 * Export commands array for named import usage
 * @type {Array<Object>}
 */
export const commands = commandsDatabase;

/**
 * Default export for module compatibility
 * @type {Array<Object>}
 */
export default commands;
