var Currency={rates:{"USD":1.0,"EUR":1.12236,"GBP":1.30214,"CAD":0.749138,"ARS":0.0230686,"AUD":0.711318,"BRL":0.255023,"CLP":0.0014695,"CNY":0.148991,"CYP":0.397899,"CZK":0.0434715,"DKK":0.150355,"EEK":0.0706676,"HKD":0.127393,"HUF":0.00349525,"ISK":0.00814976,"INR":0.0144124,"JMD":0.00795126,"JPY":0.00901008,"LVL":1.57329,"LTL":0.320236,"MTL":0.293496,"MXN":0.051696,"NZD":0.682365,"NOK":0.116143,"PLN":0.260921,"SGD":0.738381,"SKK":21.5517,"SIT":175.439,"ZAR":0.0697245,"KRW":0.00087922,"SEK":0.107782,"CHF":1.00478,"TWD":0.0324006,"UYU":0.0295812,"MYR":0.244924,"BSD":1.0,"CRC":0.00165782,"RON":0.235086,"PHP":0.018985,"AED":0.272294,"VEB":0.000100125,"IDR":7.02233e-05,"TRY":0.178423,"THB":0.0315222,"TTD":0.147748,"ILS":0.275295,"SYP":0.00194164,"XCD":0.370032,"COP":0.000313677,"RUB":0.0152434,"HRK":0.150856,"KZT":0.00263464,"TZS":0.000432109,"XPT":850.095,"SAR":0.266667,"NIO":0.0304929,"LAK":0.000116266,"OMR":2.60078,"AMD":0.00205638,"CDF":0.000611841,"KPW":0.00111103,"SPL":6.0,"KES":0.00992163,"ZWD":0.00276319,"KHR":0.000249528,"MVR":0.0649558,"GTQ":0.130215,"BZD":0.496359,"BYR":4.69629e-05,"LYD":0.723794,"DZD":0.00835894,"BIF":0.000545109,"GIP":1.30214,"BOB":0.1447,"XOF":0.00171102,"STD":4.59141e-05,"NGN":0.00277013,"PGK":0.296501,"ERN":0.0666667,"MWK":0.00138077,"CUP":0.0377358,"GMD":0.0201193,"CVE":0.0101783,"BTN":0.0144124,"XAF":0.00171102,"UGX":0.000269181,"MAD":0.103512,"MNT":0.000381169,"LSL":0.0697245,"XAG":15.1413,"TOP":0.43432,"SHP":1.30214,"RSD":0.00951211,"HTG":0.0119649,"MGA":0.000280143,"MZN":0.015748,"FKP":1.30214,"BWP":0.0929182,"HNL":0.0409085,"PYG":0.000162343,"JEP":1.30214,"EGP":0.0577225,"LBP":0.00066335,"ANG":0.558803,"WST":0.381596,"TVD":0.711318,"GYD":0.00479785,"GGP":1.30214,"NPR":0.00896571,"KMF":0.00228136,"IRR":2.37611e-05,"XPD":1374.54,"SRD":0.134147,"TMM":5.71429e-05,"SZL":0.0697245,"MOP":0.123683,"BMD":1.0,"XPF":0.00940535,"ETB":0.034678,"JOD":1.41044,"MDL":0.057823,"MRO":0.00273336,"YER":0.00399624,"BAM":0.573852,"AWG":0.558659,"PEN":0.301426,"VEF":0.100125,"SLL":0.000112595,"KYD":1.21951,"AOA":0.00314355,"TND":0.330623,"TJS":0.105947,"SCR":0.0731001,"LKR":0.00569896,"DJF":0.00562364,"GNF":0.000108509,"VUV":0.00877039,"SDG":0.0210082,"IMP":1.30214,"GEL":0.371752,"FJD":0.469207,"DOP":0.0197388,"XDR":1.38717,"MUR":0.028585,"MMK":0.00066097,"LRD":0.00613546,"BBD":0.5,"ZMK":8.21723e-05,"XAU":1291.9,"VND":4.30784e-05,"UAH":0.036671,"TMT":0.285714,"IQD":0.000839303,"BGN":0.573852,"KGS":0.0143165,"RWF":0.00111287,"BHD":2.65957,"UZS":0.000119164,"PKR":0.00710933,"MKD":0.0182531,"AFN":0.0131979,"NAD":0.0697245,"BDT":0.0118939,"AZN":0.589447,"SOS":0.00172455,"QAR":0.274725,"PAB":1.0,"CUC":1.0,"SVC":0.114286,"SBD":0.125134,"ALL":0.00895733,"BND":0.738381,"KWD":3.28738,"GHS":0.185913,"ZMW":0.0821723,"XBT":4115.3,"NTD":0.0337206,"BYN":0.469629,"CNH":0.14897,"MRU":0.0273336,"STN":0.0459141,"VES":0.000304129},convert:function(amount,from,to){return(amount*this.rates[from])/this.rates[to];}};