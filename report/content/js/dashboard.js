/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.70695970695971, "KoPercent": 0.29304029304029305};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.1761904761904762, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.16129032258064516, 500, 1500, "Pre Login"], "isController": false}, {"data": [0.14, 500, 1500, "Web Tours"], "isController": false}, {"data": [0.14, 500, 1500, "Submit Registration Form"], "isController": false}, {"data": [0.2202797202797203, 500, 1500, "View Itinerary"], "isController": false}, {"data": [0.25129533678756477, 500, 1500, "Logout"], "isController": false}, {"data": [0.1, 500, 1500, "Click on Sign Up"], "isController": false}, {"data": [0.17357512953367876, 500, 1500, "Search for Flights"], "isController": false}, {"data": [0.18, 500, 1500, "Web Tours Home Request"], "isController": false}, {"data": [0.17204301075268819, 500, 1500, "Login"], "isController": false}, {"data": [0.17666666666666667, 500, 1500, "Book Flight "], "isController": false}, {"data": [0.135, 500, 1500, "Login with new credentials"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1365, 4, 0.29304029304029305, 3021.224908424907, 80, 24922, 1808.0, 3289.0000000000014, 15460.000000000005, 23625.07999999999, 33.8642453111045, 64.16871825227003, 20.64135453880123], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["Pre Login", 93, 0, 0.0, 10766.817204301076, 111, 24922, 10377.0, 22875.800000000003, 23798.0, 24922.0, 2.6785714285714284, 4.491315569196429, 1.1378696986607144], "isController": false}, {"data": ["Web Tours", 100, 0, 0.0, 11107.16, 80, 24590, 11137.0, 23326.500000000004, 23995.0, 24587.94, 2.9330674018888954, 4.918043680706282, 1.245980781075849], "isController": false}, {"data": ["Submit Registration Form", 100, 0, 0.0, 1745.5499999999997, 467, 2724, 1830.0, 2317.5, 2504.45, 2722.139999999999, 2.6560424966799467, 2.1346904050464808, 1.1075489707835326], "isController": false}, {"data": ["View Itinerary", 143, 2, 1.3986013986013985, 1612.363636363636, 238, 3371, 1714.0, 2262.6, 2656.0, 3158.040000000001, 3.626588217392407, 10.006874151999696, 3.2748810818264817], "isController": false}, {"data": ["Logout", 193, 0, 0.0, 1587.1036269430062, 120, 9580, 1631.0, 2290.6, 2596.0999999999985, 3351.560000000015, 4.990045763632133, 4.994969353556377, 2.5211052838250123], "isController": false}, {"data": ["Click on Sign Up", 100, 0, 0.0, 1810.8499999999997, 341, 2958, 1801.5, 2390.2000000000003, 2586.7, 2955.6099999999988, 2.7079722703639515, 3.895883543652513, 1.8643754400454942], "isController": false}, {"data": ["Search for Flights", 193, 2, 1.0362694300518134, 1737.8601036269436, 407, 3057, 1775.0, 2438.7999999999997, 2693.8999999999996, 2979.92, 4.94073675856949, 12.981158841166833, 4.150621872040038], "isController": false}, {"data": ["Web Tours Home Request", 100, 0, 0.0, 1744.9600000000003, 217, 3499, 1692.0, 2464.4000000000005, 3005.3999999999987, 3497.109999999999, 2.8085154187496486, 7.320241848283997, 1.231468186541594], "isController": false}, {"data": ["Login", 93, 0, 0.0, 1845.3440860215055, 182, 3788, 1844.0, 2783.600000000001, 3108.2, 3788.0, 2.5915398762748705, 2.23975858447584, 1.5842812134258484], "isController": false}, {"data": ["Book Flight ", 150, 0, 0.0, 1748.7133333333327, 416, 11419, 1722.5, 2426.8, 2814.9999999999986, 7269.640000000074, 3.844478048030346, 11.07169631186406, 2.735686527667427], "isController": false}, {"data": ["Login with new credentials", 100, 0, 0.0, 1755.9599999999998, 561, 3264, 1792.0, 2312.1, 2616.999999999999, 3260.179999999998, 2.6494979201441327, 4.5253631468086795, 1.146218338499854], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["500/Internal Server Error", 4, 100.0, 0.29304029304029305], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1365, 4, "500/Internal Server Error", 4, "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["View Itinerary", 143, 2, "500/Internal Server Error", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["Search for Flights", 193, 2, "500/Internal Server Error", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
