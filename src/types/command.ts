interface BaseCommand {
  name: string;
  value?: unknown;
}

interface CheckInputCommand extends BaseCommand {
  value?: string | undefined;
  callarIndex: number;
}

export type {CheckInputCommand};
