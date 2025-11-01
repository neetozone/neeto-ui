#!/bin/bash
# Wrapper script to unset problematic environment variables before running Yarn
# This prevents Yarn 4 from interpreting env vars like "production" as config settings

# Unset the "production" environment variable if it exists
unset production

# Run the yarn command with all passed arguments
exec yarn "$@"

