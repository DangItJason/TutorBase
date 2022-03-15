import imageCompression from "browser-image-compression";

// Current colors of subject buttons are hard-coded
export function SubjectToColor(courseid:string) {
    let hash = 0;
    for (var i = 0; i < courseid.length; i++) {
       hash = courseid.charCodeAt(i) + ((hash << 5) - hash);
    }
  let c = (hash & 0x00FFFFFF)
  .toString(16)
  .toUpperCase();
  return '#' + ("00000".substring(0, 6 - c.length) + c);
}


export function BreakDownTime(standard_time: String): Array<String> {
    const monthMap = new Map([
        [1, "January"],
        [2, "February"],
        [3, "March"],
        [4, "April"],
        [5, "May"],
        [6, "June"],
        [7, "July"],
        [8, "August"],
        [9, "September"],
        [10, "October"],
        [11, "November"],
        [12, "December"],
    ])

    let date_time = standard_time.split("T")

    let date_arr = date_time[0].split("-")
    let month = monthMap.get(Number(date_arr[1])) ? monthMap.get(Number(date_arr[1])) : " ";
    let date = month + " " + date_arr[2] + ", " + date_arr[0]

    let time_arr = date_time[1].split(":");
    let meridian = " AM"
    let hour = Number(time_arr[0])
    if (hour > 12) {
        hour -= 12
        meridian = " PM"
    }
    let time = String(hour) + ":" + time_arr[1] + meridian;
    return [date,time];
}

export function CapitalizeFirstLetter(str: String): String {
    let string_arr = str.split(" ");
    let new_arr:string[] = []
    for (const word of string_arr) {
        new_arr.push(word.charAt(0).toUpperCase() + word.slice(1))
    }
    return new_arr.join(" ");
}

export function IsFutureDate(standard_time: String): boolean {
    let check_date_str = standard_time.split("T")[0].split("-")
    let check_date = [Number(check_date_str[1]),Number(check_date_str[2]),Number(check_date_str[0])]
    let curr_date = new Date();
    // let curr_date = new Date('August 19, 1975 23:15:30');

    if (check_date[2] > curr_date.getFullYear()) {
        return true
    } else if (check_date[2] < curr_date.getFullYear()) {
        return false
    }

    if (check_date[0] > (curr_date.getMonth() + 1)) {
        return true
    } else if (check_date[0] < (curr_date.getMonth() + 1)) {
        return false
    }

    if (check_date[1] > curr_date.getDate()) {
        return true
    } else if (check_date[1] < curr_date.getDate()) {
        return false
    }

    return true;
}

// For now, store as a base-64 string
// In the future, we would like to upload this to an external object/file storage instead
export function CompressAndSaveImg(input: string, name: string, saveHandler: (img: string) => void): void {
    let reader = new FileReader();
    reader.onload = async () => {
        if(reader.result) {
            let res: string = reader.result.toString();
            saveHandler(res);
        }
    };

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 250,
        useWebWorker: true
    };

    fetch(input)
        .then(res => res.blob())
        .then(blob => {
        const file = new File([blob], name, { type: "image/jpg" });
        imageCompression(file, options)
            .then((data: File) => reader.readAsDataURL(data))
            .catch((error: Error) => console.log(error.message));
    });
}
