import _ from "lodash";

export type ProjectProps = {
  readonly records: ProjectRecords[];
};

export type ProjectRecords = {
  readonly fields: {
    readonly description?: string;
    readonly last_update?: string;
    readonly main_url: string;
    readonly name?: string;
    readonly repo_title: string;
    readonly repo_url: string;
    readonly stacks: string[];
  };
};
