// FIXME Fix having to import express
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as express from 'express';

declare global {
  namespace Express {
    interface Request {
      tenant?: {
        tenantId: string;
        dataSourceUrl: string;
      };
    }
  }
}
