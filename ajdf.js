//TEST TODO: if you see this delte it : )))))) I forgot
        //TODO: must be moved inside a main module , not here
        //TODO: create a map to number function that gets an input and returns a number as output
        $provide.decorator('dateFilter', function ($delegate, i18n) {
                'ngInject';
                var srcFilter = $delegate;

                var extendsFilter = function () {
                        console.log(this, '-', arguments, '-', arguments[2]);
                        var g = srcFilter.apply(this, arguments);
                        let lang = i18n.getLanguage();
                        if (lang === 'fa') {
                            try {
                                if (!arguments[0]) return;
                                let symbolMap = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
                                let monthSymbolMapFull = ['فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور', 'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'];
                                let monthSymbolMapShort = ['فرو.', 'ارد.', 'خرد.', 'تیر', 'مرد.', 'شهر.', 'مهر', 'آبا.', 'آذر', 'دی', 'بهم.', 'اسف.'];
                                let weekday = ['یک شنبه', 'دو شنبه', 'سه شنبه', 'چهار شنبه', 'پنج شنبه', 'جمعه', 'شنبه'];
                                let weekdayShort = ['یک.ش.', 'دو.ش.', 'سه.ش.', 'چهار.ش.', 'پنج.ش.', 'جمعه', 'شنبه'];

                                let inputTime;
                                if (typeof(arguments[0]) === 'number') {
                                    inputTime = new Date(arguments[0]);
                                } else {
                                    inputTime = arguments[0]
                                }
                                let ld = inputTime.toLocaleString("fa-ir");
                                let sections = ld.split(' ');
                                let dates = sections[0].split('/'); //dates[0]: year, dates[1]:  month, dates[2]: day
                                let times = sections[2].split(':'); //times[0]: hour, times[1]: minute, times[2]: second
                                let locale = sections[1].substr(0, 4); //locale === ه.ش
                                let longLocale = "هجری شمسی";

                                let format = arguments[1];
                                if (!format) format = "longDate";
                                if (format !== null && format !== undefined && format !== "" && format !== " ") {
                                    switch (format) {
                                        //NOTE TODO: in 'medium' place of month and day are reversed to match persian claender
                                        //TODO: consider (or not) adding a `jmedium' and the original remains untouched
                                        case 'medium':
                                            format = 'd MMM, y h:mm:ss a';
                                            break;
                                        //NOTE TODO: 'short' is reversed in order to match persian type
                                        //TODO: maybe its better to add a jshort for jalali calender ? huh ? nad original short remains untouched
                                        case 'short':
                                            format = 'yy/M/d h:mm a';
                                            break;
                                        //NOTE TODO: day and month order are reversed ...
                                        case 'fullDate':
                                            format = 'EEEE, d MMMM, y';
                                            break;
                                        //NOTE TODO: day and month order are reversed ...
                                        case 'longDate':
                                            format = 'd MMMM, y';
                                            break;
                                        //NOTE TODO: day and month order are reversed ...
                                        case 'mediumDate':
                                            format = 'd MMM, y';
                                            break;
                                        //NOTE TODO: day and month order are reversed ...
                                        case 'shortDate':
                                            format = 'yy/M/d';
                                            break;
                                        case 'mediumTime':
                                            format = 'h:mm:ss a';
                                            break;
                                        case 'shortTime':
                                            format = 'h:mm a';
                                            break;
                                    }

                                    //sss,a,Z,ww,w,

                                    // TODO : make them all regexp to replace all

                                    //TODO: what is difference of LLLL and MMMM ? I replaced it :)
                                    format = format.replace('LLLL', 'MMMM');

                                    //year
                                    format = format.replace("yyyy", dates[0]);
                                    format = format.replace("yy", dates[0].substr(2, 3));
                                    format = format.replace("y", dates[0]);

                                    //month
                                    let mappedMonth = "";
                                    if (format.search('MMMM') > -1 || format.search('MMM') > -1 || format.search('MM') > -1 || format.search('M') > -1) {
                                        for (let l = 0; l < dates[1].length; l++) {
                                            for (let i = 0; i < symbolMap.length; i++) {
                                                if (dates[1][l] === symbolMap[i]) {
                                                    mappedMonth += i.toString();
                                                }
                                            }
                                            mappedMonth = parseInt(mappedMonth);
                                        }
                                        mappedMonth--;

                                        //TODO MOOND
                                        //format = format.replace('MMMM', monthSymbolMapFull[mappedMonth]);
                                        //format = format.replace(new RegExp('MMMM', 'g'), monthSymbolMapFull[mappedMonth]);
                                        //console.log(format, monthSymbolMapFull[mappedMonth]);
                                        format = format.replace('MMM', monthSymbolMapFull[mappedMonth]);
                                        if (format.search('MM') > -1) {
                                            if (dates[1].length < 2) {
                                                dates[1] = '۰' + dates[1];
                                            }
                                            format = format.replace("MM", dates[1]);
                                        }
                                        if (mappedMonth < 9) format = format.replace('M', dates[1][1]);
                                        format = format.replace("M", dates[1]);
                                    }

                                    //day
                                    let mappedDay = "";
                                    if (format.search('dd') > -1 || format.search('d') > -1) {
                                        for (let l = 0; l < dates[2].length; l++) {
                                            for (let i = 0; i < symbolMap.length; i++) {
                                                if (dates[2][l] === symbolMap[i]) {
                                                    mappedDay += i.toString();
                                                }
                                            }
                                            mappedDay = parseInt(mappedDay);
                                        }
                                        mappedDay--;

                                        if (dates[2].length < 2) {
                                            dates[2] = '۰' + dates[2];
                                        }

                                        format = format.replace("dd", dates[2]);

                                        if (mappedDay < 9) format = format.replace("d", dates[2][1]);
                                        format = format.replace("d", dates[2]);
                                    }

                                    if (format.search('EEEE') > -1 || format.search('EEE') > -1) {
                                        let day = arguments[0].getDay();
                                        format = format.replace('EEEE', weekday[day]);
                                        format = format.replace('EEE', weekdayShort[day]);
                                    }

                                    let mappedHour = "";
                                    if (format.search('a') > -1) {
                                        let mappedTimes = [];
                                        for (let l = 0; l < times[0].length; l++) {
                                            for (let i = 0; i < symbolMap.length; i++) {
                                                if (times[0][l] === symbolMap[i]) {
                                                    mappedHour += i.toString();
                                                }
                                            }
                                            mappedTimes.push(mappedHour);
                                            mappedHour = parseInt(mappedHour);
                                        }
                                        if (mappedHour >= 12) {
                                            format = format.replace('a', 'ب.ظ.');
                                        } else {
                                            format = format.replace('a', 'ق.ظ.');
                                        }
                                    }

                                    if (format.search('h') > -1 || format.search('hh') > -1) {
                                        mappedHour %= 12;
                                        let result = "";
                                        if (mappedHour > 9) {
                                            result = symbolMap[Math.floor(mappedHour / 10)];
                                            result += symbolMap[mappedHour % 10];
                                        } else {
                                            result = symbolMap[mappedHour];
                                        }
                                        if (format.search('hh') > -1) {
                                            let resultN = parseInt(result);
                                            if (resultN < 10) {
                                                format = format.replace('hh', '۰' + result);
                                            }
                                            format = format.replace('hh', result);
                                        }
                                        format = format.replace('h', result);
                                    }

                                    if (format.search('HH') > -1) {
                                        if (times[0].length < 2) {
                                            times[0] = '۰' + times[0];
                                        }
                                        format = format.replace('HH', times[0]);
                                    }
                                    format = format.replace('H', times[0]);

                                    if (format.search('mm') > -1) {
                                        if (times[1].length < 2) {
                                            times[1] = '۰' + times[1];
                                        }
                                        format = format.replace('mm', times[0]);
                                    }
                                    //TODO
                                    format = format.replace('m', times[1]);

                                    //TODO
                                    if (format.search('ss') > -1) {
                                        if (times[2].length < 2) {
                                            times[2] = '۰' + times[2];
                                        }
                                        format = format.replace('ss', times[2]);
                                    }
                                    //TODO
                                    format = format.replace('s', times[2]);

                                    //TODO create a function that gets a English number and converts it to persian characters
                                    //TODO and one vice versa
                                    let convertToPersianSymbols = function (input) {
                                        let result = "";
                                        if (input < 10) {
                                            result += symbolMap[input];
                                        } else if (input < 100) {
                                            result += symbolMap[Math.floor(input / 10)];
                                            result += symbolMap[input % 10];
                                        } else if (input < 1000) {
                                            result += symbolMap[Math.floor(input / 100)];
                                            input %= 100;
                                            result += symbolMap[Math.floor(input / 10)];
                                            result += symbolMap[input % 10];
                                        }

                                        return result;
                                    };

                                    format = format.replace('sss', convertToPersianSymbols(inputTime.getMilliseconds()));

                                    if (format.search('Z') > -1) {
                                        let timeZoneOffset = inputTime.getTimezoneOffset();
                                        timeZoneOffset = (timeZoneOffset / 60) * (-1);
                                        let part1 = parseInt(timeZoneOffset);
                                        if (part1 < 10) {
                                            part1 = "۰" + convertToPersianSymbols(part1);
                                        } else {
                                            part1 = convertToPersianSymbols(part1);
                                        }

                                        let part2 = (timeZoneOffset * 10) % 10;
                                        part2 = (part2 * 60) / 10;
                                        if (part2 < 10) {
                                            part2 = "۰" + convertToPersianSymbols(part2);
                                        } else {
                                            part2 = convertToPersianSymbols(part2);
                                        }

                                        let result = (timeZoneOffset >= 0 ? '+' : '-') + part1 + part2;

                                        format = format.replace('Z', result);
                                    }

                                    if (format.search('ww') > -1 || format.search('w') > -1) {
                                        if (mappedMonth === "") {
                                            for (let l = 0; l < dates[1].length; l++) {
                                                for (let i = 0; i < symbolMap.length; i++) {
                                                    if (dates[1][l] === symbolMap[i]) {
                                                        mappedMonth += i.toString();
                                                    }
                                                }
                                                mappedMonth = parseInt(mappedMonth);
                                            }
                                            mappedMonth--;
                                        }

                                        if (mappedMonth === "") {
                                            for (let l = 0; l < dates[2].length; l++) {
                                                for (let i = 0; i < symbolMap.length; i++) {
                                                    if (dates[2][l] === symbolMap[i]) {
                                                        mappedDay += i.toString();
                                                    }
                                                }
                                                mappedDay = parseInt(mappedDay);
                                            }
                                        }

                                        let daysPassed = 0;

                                        if (mappedMonth > 6) {
                                            daysPassed = 6 * 31;
                                            mappedMonth %= 6;
                                            daysPassed += mappedMonth * 30;

                                        } else {
                                            daysPassed = mappedMonth * 31;
                                        }

                                        daysPassed += mappedDay;
                                        daysPassed++;

                                        //TODO : add persian 0
                                        format = format.replace('ww', convertToPersianSymbols(Math.floor(daysPassed / 7)));
                                        format = format.replace('w', convertToPersianSymbols(Math.floor(daysPassed / 7)));
                                    }

                                    format = format.replace('GGG', locale);
                                    format = format.replace('GG', locale);
                                    format = format.replace('G', locale);
                                    format = format.replace('GGGG', longLocale);

                                    return (arguments[2]) ? g + arguments[2] : format;
                                } else {
                                    //TODO: make this act as normal date filter original
                                    return (arguments[2]) ? g + arguments[2] : (dates[0] + '/' + dates[1] + '/' + dates[2]);
                                }
                            } catch (e) {
                                console.log(e);
                                return (arguments[2]) ? g + arguments[2] : g;
                            }
                        } else { //TODO: in more internationalized version, it should be `else if (lang === 'en')`
                            return (arguments[2]) ? g + arguments[2] : g;
                        }

                    }
                ;

                return extendsFilter;
            });
