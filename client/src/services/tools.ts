
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