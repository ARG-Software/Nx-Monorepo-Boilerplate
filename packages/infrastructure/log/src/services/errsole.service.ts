import { Injectable } from '@nestjs/common';
import errsole from 'errsole';
import ErrsolePostgres from 'errsole-postgres';
import * as net from 'net';
import { ConfigurationService } from '@nx-template/configuration';

@Injectable()
export class ErrsoleService {
  constructor(public readonly configService: ConfigurationService) {
    this.init();
  }

  private async init() {
    try {
      const dashboardPort = this.configService.errsoleDashboardPort;
      const isPortAvailable = await this.checkPort(dashboardPort);

      const poolOptions = {
        host: this.configService.logsDatabaseHost,
        user: this.configService.logsDatabaseUser,
        password: this.configService.logsDatabasePassword,
        database: this.configService.logsDatabaseName,
        port: this.configService.logsDatabasePort,
      };

      const errsoleOptions: Errsole.Options = {
        enableConsoleOutput: true,
        storage: new ErrsolePostgres(poolOptions),
        enableDashboard: isPortAvailable,
        ...(isPortAvailable && { port: dashboardPort }),
        collectLogs: ['info', 'debug', 'error'],
      };

      errsole.initialize(errsoleOptions);
    } catch (error) {
      console.error('Failed to initialize Errsole:', error);
    }
  }

  private async checkPort(port: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const server = net.createServer();

      server.once('error', (err: NodeJS.ErrnoException) => {
        if (err.code === 'EADDRINUSE') {
          resolve(false);
        } else {
          reject(err);
        }
      });

      server.once('listening', () => {
        server.close();
        resolve(true);
      });

      server.listen(port);
    });
  }
}
