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


export function BreakDownTime(standard_time: string): Array<string> {
    const months: Array<string> = [
         "January",
         "February",
         "March",
         "April",
         "May",
         "June",
         "July",
         "August",
         "September",
         "October",
         "November",
        "December"
    ];
    let date = new Date(standard_time);
    let time = GetTimeAmPm(date);
    let datestr = months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    return [datestr,time];
}

export function GetTimeAmPm(date:Date): string {
    let hours = date.getHours();
    let mins = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    let minutes: string = mins < 10 ? ('0'+ mins) : mins.toString();
    let time = hours + ':' + minutes + ' ' + ampm;
    return time;
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
