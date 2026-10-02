(function () {
    function runCalculation() {
        const banner = document.getElementById('status-banner')
        const resultsCard = document.getElementById('results-card')
        const summaryText = document.getElementById('summary-text')
        const tbody = document.getElementById('breakdown-body')
        const template = document.getElementById('row-template')

        banner.textContent = ''
        banner.className = 'banner'

        const currentRP = parseFloat(document.getElementById('current-rp').value) || 0
        const targetRP = parseFloat(document.getElementById('target-rp').value) || 0
        const currentStreak = parseFloat(document.getElementById('current-streak').value) || 0
        const baseRP = parseFloat(document.getElementById('base-rp').value) || 300

        if (!targetRP || targetRP <= 0) {
            banner.textContent = 'Please enter a valid Target RP to rank up.'
            banner.className = 'banner banner-error show'
            resultsCard.classList.add('hidden')
            return
        }

        if (currentRP >= targetRP) {
            resultsCard.classList.add('hidden')
            banner.textContent = 'Current RP already meets or exceeds the target rank goal.'
            banner.className = 'banner banner-success show'
            return
        }

        tbody.replaceChildren()
        let remaining = targetRP - currentRP
        let streak = currentStreak
        let gameIndex = 1

        while (remaining > 0) {
            streak += 1

            let bonus = 0
            if (streak >= 6) bonus = 130
            else if (streak === 5) bonus = 110
            else if (streak === 4) bonus = 90
            else if (streak === 3) bonus = 70

            const gained = baseRP + bonus
            remaining = Math.max(0, remaining - gained)

            const clone = template.content.cloneNode(true)
            const row = clone.querySelector('tr')

            row.querySelector('[data-field="game"]').textContent = `Win ${gameIndex}`
            row.querySelector('[data-field="streak"]').textContent = `${streak}🔥`
            row.querySelector('[data-field="base"]').textContent = `+${baseRP}`
            row.querySelector('[data-field="bonus"]').textContent = bonus > 0 ? `+${bonus}` : '0'
            row.querySelector('[data-field="gained"]').textContent = `+${gained}`

            const statusTd = row.querySelector('[data-field="status"]')
            if (remaining === 0) {
                statusTd.textContent = 'Rank up! 🎉'
                row.classList.add('rank-up-row')
            } else {
                statusTd.textContent = remaining
            }

            tbody.appendChild(clone)

            if (remaining === 0) break
            gameIndex += 1
        }

        summaryText.textContent = `${gameIndex} ${gameIndex === 1 ? 'Win' : 'Wins'}`
        resultsCard.classList.remove('hidden')
    }

    document.addEventListener('DOMContentLoaded', function () {
        const btn = document.getElementById('calc-btn')
        const form = document.getElementById('calc-form')

        if (btn) {
            btn.addEventListener('click', runCalculation)
        }

        if (form) {
            form.addEventListener('keydown', function (e) {
                if (e.key === 'Enter') {
                    e.preventDefault()
                    runCalculation()
                }
            })
        }
    })
})()
