$provide.decorator('dateFilter', function ($delegate, i18n) {
            'ngInject';
            var srcFilter = $delegate;

            var extendsFilter = function () {
                console.log(this, '-', arguments, '-', arguments[2]);
                var g = srcFilter.apply(this, arguments);
                let lang = i18n.getLanguage();
                if (lang === 'fa') {
                    let jd = new JDate(arguments[0].getTime());
                    console.log(jd);

                    let ld = arguments[0].toLocaleString("fa-ir");
                    let sections = ld.split(' ');
                    let dates = sections[0].split('/'); //dates[0]: year, dates[1]:  month, dates[2]: day
                    let times = sections[2].split(':'); //times[0]: hour, times[1]: minute, times[2]: second
                    let locale = sections[1].substr(0, 4); //locale === ه.ش
                    let longLocale = "هجری شمسی";

                    let format = arguments[1];
                    if (format !== null && format !== undefined && format !== "" && format !== " ") {

                        switch(format){
                            case 'medium':
                                //TODO
                                break;
                            default:
                                //LLLL,EEEE,EEE,hh,h,sss,a,Z,ww,w,

                                // TODO : make them regexp to replace all

                                //year
                                format = format.replace("yyyy", dates[0]);
                                format = format.replace("yy", dates[0].substr(2, 3));
                                format = format.replace("y", dates[0][3]);

                                //month
                                if (format.search('MMMM') > -1) {
                                    //TODO
                                } else if (format.search('MMM') > -1) {
                                    //TODO
                                } else if (format.search('MM') > -1) {
                                    //TODO
                                    format = format.replace("MM", dates[1]);
                                } else if (format.search('M') > -1) {
                                    //TODO
                                    format = format.replace("M", dates[1]);
                                }

                                //day
                                if (format.search('dd') > -1) {
                                    //TODO
                                    format = format.replace("dd", dates[2]);
                                } else if (format.search('d') > -1) {
                                    //TODO
                                    format = format.replace("d", dates[2]);
                                }

                                //TODO
                                format = format.replace('HH', times[0]);
                                //TODO
                                format = format.replace('H', times[0]);

                                //TODO
                                format = format.replace('mm', times[1]);
                                //TODO
                                format = format.replace('m', times[1]);

                                //TODO
                                format = format.replace('s', times[2]);
                                //TODO
                                format = format.replace('s', times[2]);

                                format = format.replace('GGG', locale);
                                format = format.replace('GG', locale);
                                format = format.replace('G', locale);
                                format = format.replace('GGGG', longLocale);
                        }

                        return (arguments[2]) ? g + arguments[2] : format;
                    } else {
                        return (arguments[2]) ? g + arguments[2] : (jd.getFullYear() + '/' + jd.getMonth() + '/' + jd.getDate());
                    }
                } else { //TODO: in more internationalized version, it should be `else if (lang === 'en')`
                    return (arguments[2]) ? g + arguments[2] : g;
                }

            };

            return extendsFilter;
        });
