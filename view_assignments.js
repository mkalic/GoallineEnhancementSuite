// ==UserScript==
// @name         Make Assignments List Not Suck
// @version      0.3.2
// @description  Have the Goalline assignments page show more than just 3 days worth of assignments initially
// @author       Marko Kalic
// @match        https://msa-manitobasoccer.goalline.ca/show_referee_assignments.php
// @icon         https://www.google.com/s2/favicons?domain=goalline.ca
// @updateUrl	 https://raw.githubusercontent.com/mkalic/GoallineEnhancementSuite/main/view_assignments.js
// @downloadUrl	 https://raw.githubusercontent.com/mkalic/GoallineEnhancementSuite/main/view_assignments.js
// @grant        none
// ==/UserScript==

(function() {
    // Goalline says it will only allow a date range of 60 days, but it still complains when the difference is actually 60
    const DATE_DIFF = 58;

    const currentYear = parseInt(document.getElementById('from_year').value);
    const currentMonth = parseInt(document.getElementById('from_month').value);
    const currentDay = parseInt(document.getElementById('from_day').value);
    const fromDate = new Date(currentYear, currentMonth - 1, currentDay);

    const toYear = parseInt(document.getElementById('to_year').value);
    const toMonth = parseInt(document.getElementById('to_month').value);
    const toDay = parseInt(document.getElementById('to_day').value);
    const toDate = new Date(toYear, toMonth - 1, toDay);

    const diffTime = toDate - fromDate;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < DATE_DIFF) {
        toDate.setFullYear(fromDate.getFullYear());
        toDate.setMonth(fromDate.getMonth());
        toDate.setDate(fromDate.getDate() + DATE_DIFF);

        document.getElementById('to_year').value = toDate.getFullYear();
        document.getElementById('to_month').value = toDate.getMonth() + 1;
        document.getElementById('to_day').value = toDate.getDate();

        const form = document.querySelector('form[action="show_referee_assignments.php"]');

        form.submit();
    }
})();
