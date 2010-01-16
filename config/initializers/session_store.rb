# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key    => '_iFUO_session',
  :secret => 'f9efc3f6cf40b758d6879907feeb6edc4893068fefa5bb8dccb332d68ec484416e0a5747e652ef0e7b47ef046c601cc0191fb9ef73dcd329e903315e25218b2f'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
