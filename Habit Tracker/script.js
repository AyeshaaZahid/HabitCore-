// --- DATA INITIALIZATION SANDBOX ---
let habits = JSON.parse(localStorage.getItem('vanilla_habits')) || [];
let history = JSON.parse(localStorage.getItem('vanilla_history')) || {};
let currentMonday = getMonday(new Date());

// --- MULTI-PAGE NAVIGATION ROUTING SINGLE ENGINE ---
function switchPage(pageId, clickedBtn) {
    // Hide all view panels
    document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
    // Show selected view panel
    document.getElementById(pageId).classList.add('active');
    
    // Toggle active classes across menu sidebar list links
    document.querySelectorAll('.menu-item').forEach(b => b.classList.remove('active'));
    clickedBtn.classList.add('active');

    // If opening Analytics page, run recalculations metrics
    if (pageId === 'analyticsPage') {
        updateAnalyticsMetrics();
    }
}

// --- ANALYTICS DATA CALCULATION ---
function updateAnalyticsMetrics() {
    document.getElementById('statTotalHabits').innerText = habits.length;

    // Count total lifetime check marks logged
    let checksCount = 0;
    Object.keys(history).forEach(dateKey => {
        Object.keys(history[dateKey]).forEach(habitId => {
            if (history[dateKey][habitId] === true) checksCount++;
        });
    });
    document.getElementById('statTotalChecks').innerText = checksCount;

    // Find highest active streak out of all habits
    let maxStreak = 0;
    habits.forEach(h => {
        const currentStreak = calculateStreak(h.id);
        if (currentStreak > maxStreak) maxStreak = currentStreak;
    });
    document.getElementById('statMaxStreak').innerText = `${maxStreak} Days`;
}

// --- SETTINGS DESTRUCTION TRIGGER WORKSPACE ---
function clearDataWorkspace() {
    if(confirm("DANGER: Wiping app database will permanently reset your history record dashboard rows. Proceed?")) {
        localStorage.clear();
        habits = [];
        history = {};
        currentMonday = getMonday(new Date());
        saveAndRender();
        location.reload(); // Refresh the environment cleanly
    }
}

// --- HABIT TRAVERSAL & CALENDAR MATRIX LOGIC ---
function getMonday(d) {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    const mon = new Date(date.setDate(diff));
    mon.setHours(0,0,0,0);
    return mon;
}

function formatDateString(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function getWeekDays(monday) {
    return Array.from({length: 7}, (_, i) => {
        const day = new Date(monday);
        day.setDate(monday.getDate() + i);
        return day;
    });
}

// --- FIX: CONSECUTIVE BACKWARD STREAK ALGORITHM ---
function calculateStreak(habitId) {
    let streak = 0;
    
    // 1. Get today's true date baseline (normalized to midnight)
    const today = new Date();
    today.setHours(0,0,0,0);
    
    // 2. Establish yesterday's date fallback
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const tStr = formatDateString(today);
    const yStr = formatDateString(yesterday);

    // Rule: If neither today nor yesterday is checked, the active streak is broken
    if (!history[tStr]?.[habitId] && !history[yStr]?.[habitId]) {
        return 0;
    }

    // Determine our starting anchor: start at today if checked, otherwise drop back to yesterday
    let checkDate = history[tStr]?.[habitId] ? new Date(today) : new Date(yesterday);

    // 3. Track backward day-by-day infinitely until a gap is found
    while (true) {
        const sStr = formatDateString(checkDate);
        
        if (history[sStr]?.[habitId]) {
            streak++;
            // Safely decrement by exactly 1 calendar day
            checkDate.setDate(checkDate.getDate() - 1);
        } else {
            // Break the loop cleanly the moment a tracking gap is encountered
            break;
        }
    }
    
    return streak;
}


// --- CONTROLLERS ---
function addHabit() {
    const input = document.getElementById('habitInput');
    const name = input.value.trim();
    if (!name) return;

    habits.push({ id: Date.now().toString(), name });
    input.value = '';
    saveAndRender();
}

function deleteHabit(id) {
    if(confirm("Delete this habit tracking row?")) {
        habits = habits.filter(h => h.id !== id);
        saveAndRender();
    }
}

function renameHabit(id) {
    const oldName = habits.find(h => h.id === id).name;
    const newName = prompt("Rename your habit activity:", oldName);
    if (newName && newName.trim()) {
        habits = habits.map(h => h.id === id ? {...h, name: newName.trim()} : h);
        saveAndRender();
    }
}

function toggleDay(habitId, dateStr) {
    if (!history[dateStr]) history[dateStr] = {};
    history[dateStr][habitId] = !history[dateStr][habitId];
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('vanilla_habits', JSON.stringify(habits));
    localStorage.setItem('vanilla_history', JSON.stringify(history));
    render();
}

function navigateWeek(direction) {
    currentMonday.setDate(currentMonday.getDate() + (direction * 7));
    render();
}

function resetWeek() {
    currentMonday = getMonday(new Date());
    render();
}

// --- MAIN ARCHITECTURE DESIGN RENDER GRID PAINT ---
function render() {
    const days = getWeekDays(currentMonday);
    const todayStr = formatDateString(new Date());
    
    document.getElementById('weekLabel').innerText = `Week of ${currentMonday.toLocaleDateString(undefined, {month:'short', day:'numeric', year:'numeric'})}`;

    const headerRow = document.getElementById('headerRow');
    headerRow.innerHTML = `<th class="habit-col">Habit Tracked</th><th class="streak-col">Streak</th>`;
    
    days.forEach(day => {
        const dStr = formatDateString(day);
        const isToday = dStr === todayStr;
        headerRow.innerHTML += `
            <th class="${isToday ? 'today-col' : ''}">
                <div>${day.toLocaleDateString(undefined, {weekday:'short'})}</div>
                <div style="font-size: 11px; opacity: 0.3; margin-top: 4px;">${day.getDate()}</div>
            </th>`;
    });

    const tbody = document.getElementById('tableBody');
    const emptyState = document.getElementById('emptyState');
    const tableElement = document.getElementById('trackerTable');
    tbody.innerHTML = '';

    if (habits.length === 0) {
        emptyState.style.display = 'block';
        tableElement.style.display = 'none';
        return;
    } else {
        emptyState.style.display = 'none';
        tableElement.style.display = 'table';
    }

    habits.forEach(habit => {
        const streak = calculateStreak(habit.id);
        let rowHtml = `
            <tr>
                <td class="habit-col">
                    <div class="habit-row-container">
                        <span style="font-weight:600; color:#e2e8f0;">${habit.name}</span>
                        <div class="action-btns">
                            <button class="btn-icon" onclick="renameHabit('${habit.id}')">✏️</button>
                            <button class="btn-icon" style="color:#ef4444;" onclick="deleteHabit('${habit.id}')">🗑️</button>
                        </div>
                    </div>
                </td>
                <td class="streak-col">
                    <span class="streak-badge ${streak === 0 ? 'zero' : ''}">🔥 ${streak}</span>
                </td>
        `;

        days.forEach(day => {
            const dStr = formatDateString(day);
            const isChecked = !!history[dStr]?.[habit.id];
            const isToday = dStr === todayStr;
            const isFuture = day > new Date();

            rowHtml += `
                <td class="${isToday ? 'today-col' : ''}">
                    <button 
                        class="cell-btn ${isChecked ? 'checked' : ''}" 
                        ${isFuture ? 'disabled' : ''} 
                        onclick="toggleDay('${habit.id}', '${dStr}')">
                    </button>
                </td>`;
        });

        rowHtml += `</tr>`;
        tbody.innerHTML += rowHtml;
    });
}

// Baseline Initial Launch Paint
render();