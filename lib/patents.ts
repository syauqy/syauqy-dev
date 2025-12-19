export type PatentsProps = {
  readonly records: PatentRecords[];
};

export type PatentRecords = {
  readonly fields: {
    readonly title: string;
    readonly description?: string;
    readonly patent_url: string;
    readonly patent_number?: string;
    readonly inventors?: string[];
  };
};
