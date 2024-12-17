import type { ICellRendererParams } from 'ag-grid-community';

export function ContributorRenderer(params: ICellRendererParams) {
  const link = `<a href="${params?.value}" target="_blank">${new URL(params?.value).hostname}</a>`;
  return link;
}


export function PRLinkRenderer(params: ICellRendererParams) {
  if (params?.data?.pull_request) {
    const link = `<a href="${params?.data?.pull_request.html_url}" target="_blank">PR Link</a>`;
    return link;
  } else {
    return 'No PR exist';
  }
}


export function PRRenderer(params: ICellRendererParams) {
  if (params?.value) {
    const link = `<a href="${params?.value}" target="_blank">PR Link</a>`;
    return link;
  } else {
    return 'No PR exist';
  }
}

export function CommitLinkRenderer(params: ICellRendererParams) {
  if (params?.value) {
    const link = `<a href="${params?.value}" target="_blank">Commit Link</a>`;
    return link;
  } else {
    return 'No PR exist';
  }
}

export function IssueLinkRenderer(params: ICellRendererParams) {
  if (!params?.data?.pull_request) {
    const link = `<a href="${params?.value}" target="_blank">Issue Link</a>`;
    return link;
  } else {
    return '-';
  }
}