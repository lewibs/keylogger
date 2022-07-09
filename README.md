# keylogger
This is used to log the keys that the user presses in browser

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
  
additionally there are three prototypes attached:
start() : which starts logging
stop(): which pauses the logging
kill(): which pauses the logging and also removes the history
