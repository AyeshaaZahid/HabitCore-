# Assessment Answers

### 1. How to run
* **Command / Steps**: Double-click or open the `index.html` file natively in any web browser.
* **Prerequisites**: None.

### 2. Stack & design choices
* **Frontend Stack**: Modular Vanilla HTML5, custom CSS3 flex variables, and JavaScript ES6 runtime DOM manipulation. I selected this stack to keep compilation time at zero while fulfilling the requirements within the browser.
* **Visual Decision 1 (Sidebar Navigation Routing)**: Instead of multi-file directory loading, I built an SPA architecture layout using CSS hidden declarations (`.page-view { display: none }`). This gives the user instant sidebar page switching without annoying page flashes or reloads.
* **Visual Decision 2 (Dashboard Analytics Matrix)**: Added an asynchronous calculation hook (`updateAnalyticsMetrics()`) triggered when users open the progress tab, aggregating checkboxes automatically to calculate real-time completion volume and record streaks.

### 3. Responsive & accessibility
* **Responsive Layout**: On wider desktops, it sets up a desktop sidebar panel wrapper layout (`width: 280px`). On mobile devices under 360px wide, the layout table rolls safely within an absolute overflow box container (`overflow-x: auto`), maintaining clean usability.
* **Accessibility Addressed**: Cell checkbox element triggers implement custom programmatic descriptions (`aria-label`) dynamically to state explicitly what date index cell is about to be modified.
* **Accessibility Skipped**: Focused focus borders for native tab indexing were bypassed due to the quick 5-hour time window.

### 4. AI usage
* **Tool Used**: Gemini
* **Prompt Task**: Convert dynamic state checking operations to toggle single-page visibility targets without template engines.
* **Modification applied**: The original routing script used window window hash states which could conflict with file path roots. I refactored this into explicit element class modifications to keep paths stable in local directories.

### 5. Honest gap
Given an additional day, I would integrate a fully dynamic SVG rendering chart graph inside the Analytics panel to plot daily metric progress trends visually.