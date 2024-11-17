import { ICellRendererParams } from '@ag-grid-community/core';

export function EmployeeNameAndImage(params: ICellRendererParams) {
  const image = `<img src="assets/images/${params.data.image}.png" alt="img" style="width: 24px; margin-right: 12px">`;
  const name = params.data.name;

  return image + name;
}