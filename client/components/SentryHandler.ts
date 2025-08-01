import * as Sentry from "@sentry/react";
import axios from "axios";

export function captureHandledError(error: unknown, context?: string) {
  if (axios.isAxiosError(error)) {
    Sentry.withScope(scope => {
      scope.setContext("axios_response", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
        url: error.config?.url,
        method: error.config?.method,
      });
      if (context) scope.setTag("error_context", context);
      Sentry.captureException(error);
    });
  } else if (error instanceof Error) {
    Sentry.withScope(scope => {
      if (context) scope.setTag("error_context", context);
      Sentry.captureException(error);
    });
  } else {
    Sentry.withScope(scope => {
      if (context) scope.setTag("error_context", context);
      scope.setExtra("raw_error", error);
      Sentry.captureMessage("Unknown error type caught");
    });
  }
}
