interface BaseCommand {
  name: string;
  value?: unknown;
}

interface CheckInputCommand extends BaseCommand {
  value?: string | undefined;
  additionalValue?: string;
  callarIndex: number;
}

export type {CheckInputCommand};
