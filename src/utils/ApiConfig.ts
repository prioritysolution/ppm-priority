const makeApiCall = async (method: string, data: any): Promise<any> => {
  try {
    let token: string | null = null;
    if (typeof window !== 'undefined') {
      token = sessionStorage.getItem('token');
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    if (token) {
      headers.Authorization = 'Bearer ' + token;
    }

    const reqstValues: RequestInit = {
      method: method,
      headers: headers,
    };

    if (data.bodyData) {
      reqstValues.body = JSON.stringify(data.bodyData);
    }

    const response = await fetch(data?.url, reqstValues);

    if (response.status === 401) {
      // Handle unauthorized access
      sessionStorage.clear();
    }

    const result = await response.json();

    if (result?.token) {
      sessionStorage.setItem('token', result?.token);
    }

    return result;
  } catch (error) {
    throw error;
  }
};

export const doGetApiCall = (data: any): Promise<any> => makeApiCall('GET', data);
export const doPostApiCall = (data: any): Promise<any> => makeApiCall('POST', data);
export const doDeleteApiCall = (data: any): Promise<any> => makeApiCall('DELETE', data);
export const doPutApiCall = (data: any): Promise<any> => makeApiCall('PUT', data);
