# keylogger
This is used to log the keys that the user presses in browser

# usage
There are 2 important fields to note:

Keylogger.pressed which is:
  {
    keynames:bool
  }
  
Keylogger.history which is:
  [{
    pressed:{keynames:bool},
    time: unixTimeInt,
    event: Event,
  }]
  
Additionally there are three prototypes attached:
start() : which starts logging
stop(): which pauses the logging
kill(): which pauses the logging and also removes the history

# test
to test the keylogger run the test dir as a standard react program
