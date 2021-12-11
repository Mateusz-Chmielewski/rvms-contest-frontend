import { warnLevel, dangerLevel } from "./../settings";

export const validateData = (fetchedData, isActive) => {
	console.log(fetchedData);
	let tempAir = {
		class: "air-error",
		quality: "Nie aktywny",
		qualityClass: "d-none",
	};

	if (isActive) {
		tempAir.data = fetchedData.map((read) => read.quality);
		tempAir.labels = fetchedData.map((read) =>
			new Date(read.date).toLocaleTimeString(["pl"], {
				hour: "2-digit",
				minute: "2-digit",
			})
		);

		if (
			fetchedData.length < 1 ||
			fetchedData[fetchedData.length - 1].quality === 0
		) {
			tempAir.quality = "Brak odczytu";
		} else {
			tempAir.class = "air-ok";
			tempAir.qualityClass = "";
			tempAir.quality = fetchedData[fetchedData.length - 1].quality;
			tempAir.temperature = fetchedData[fetchedData.length - 1].temperature;

			if (fetchedData[fetchedData.length - 1].quality > dangerLevel) {
				tempAir.class = "air-danger";
			} else if (fetchedData[fetchedData.length - 1].quality > warnLevel) {
				tempAir.class = "air-warn";
			}
		}
	}

	console.log(tempAir);
	return tempAir;
};
