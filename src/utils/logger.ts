type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  data?: any;
  timestamp: string;
}

class Logger {
  private logToConsole(entry: LogEntry) {
    const prefix = `[${entry.timestamp}] [${entry.level.toUpperCase()}]`;
    
    switch (entry.level) {
      case 'debug':
        if (entry.data) {
          console.log(prefix, entry.message, entry.data);
        } else {
          console.log(prefix, entry.message);
        }
        break;
      case 'info':
        if (entry.data) {
          console.info(prefix, entry.message, entry.data);
        } else {
          console.info(prefix, entry.message);
        }
        break;
      case 'warn':
        if (entry.data) {
          console.warn(prefix, entry.message, entry.data);
        } else {
          console.warn(prefix, entry.message);
        }
        break;
      case 'error':
        if (entry.data) {
          console.error(prefix, entry.message, entry.data);
        } else {
          console.error(prefix, entry.message);
        }
        break;
    }
  }

  private createLogEntry(level: LogLevel, message: string, data?: any): LogEntry {
    return {
      level,
      message,
      data,
      timestamp: new Date().toISOString()
    };
  }

  debug(message: string, data?: any) {
    this.logToConsole(this.createLogEntry('debug', message, data));
  }

  info(message: string, data?: any) {
    this.logToConsole(this.createLogEntry('info', message, data));
  }

  warn(message: string, data?: any) {
    this.logToConsole(this.createLogEntry('warn', message, data));
  }

  error(message: string, data?: any) {
    this.logToConsole(this.createLogEntry('error', message, data));
  }
}

export const logger = new Logger();