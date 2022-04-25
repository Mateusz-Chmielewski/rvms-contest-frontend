export const apiUrl = "http://192.168.1.100:8080/api/v1"; // "http://192.168.0.10:8080/api/v1";
export const apiHeader = {
	Accept: "application/json",
	"Content-Type": "application/json",
};

export const refreshTime = 30; //frequency of refreshing data in seconds
export const readingsInterval = 15; //interval of reading in which readings were taken in minutes

export const warnLevel = 800;
export const dangerLevel = 1000;

export const accessTimeForAdmin = 1 / 12; // Integer number means numbers of days. For example 1 / 12 means 1 hour
