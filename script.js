export function formatStatValue(value, prefix = '', suffix = '') {
    return `${prefix}${value}${suffix}`;
}

export function validateTrialForm(fields = {}) {
    const errors = {};
    const firstName = fields.firstName?.trim() || '';
    const lastName = fields.lastName?.trim() || '';
    const email = fields.email?.trim() || '';
    const phone = fields.phone?.trim() || '';

    if (!firstName) errors.firstName = 'Ingresá tu nombre.';
    if (!lastName) errors.lastName = 'Ingresá tu apellido.';
    if (!email) errors.email = 'Ingresá tu email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Ingresá un email válido.';
    if (!phone) errors.phone = 'Ingresá tu teléfono.';
    else if (phone.replace(/\D/g, '').length < 8) errors.phone = 'Ingresá un teléfono válido.';
    if (!fields.training) errors.training = 'Elegí una modalidad.';
    if (!fields.accepted) errors.accepted = 'Necesitás aceptar para continuar.';

    return errors;
}

const motionReduced = () => window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

function setupMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-mobile-menu]');
    if (!toggle || !menu) return;

    const close = () => {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
    };
    toggle.addEventListener('click', () => {
        const willOpen = !menu.classList.contains('is-open');
        menu.classList.toggle('is-open', willOpen);
        toggle.classList.toggle('is-open', willOpen);
        toggle.setAttribute('aria-expanded', String(willOpen));
        document.body.classList.toggle('menu-open', willOpen);
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', close));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') close(); });
}

function setupHeader() {
    const header = document.querySelector('[data-header]');
    if (!header) return;
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 32);
    update();
    window.addEventListener('scroll', update, { passive: true });
}

function setupReveals() {
    const items = document.querySelectorAll('[data-reveal]');
    if (!items.length) return;
    if (motionReduced() || !('IntersectionObserver' in window)) {
        items.forEach((item) => item.classList.add('is-visible'));
        return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.14 });
    items.forEach((item) => observer.observe(item));
}

function setupCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;
    const complete = (node) => {
        node.textContent = formatStatValue(node.dataset.count, node.dataset.prefix || '', node.dataset.suffix || '');
    };
    const animate = (node) => {
        const target = Number(node.dataset.count);
        const prefix = node.dataset.prefix || '';
        const suffix = node.dataset.suffix || '';
        const start = performance.now();
        const duration = 1200;
        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            node.textContent = formatStatValue(Math.round(target * eased), prefix, suffix);
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };
    if (motionReduced() || !('IntersectionObserver' in window)) { counters.forEach(complete); return; }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) { animate(entry.target); observer.unobserve(entry.target); }
    }), { threshold: 0.65 });
    counters.forEach((counter) => observer.observe(counter));
}

function setupTrialForm() {
    const form = document.querySelector('#trial-form');
    if (!form) return;

    const submit = form.querySelector('[data-submit]');
    const submitLabel = form.querySelector('[data-submit-label]');
    const success = document.querySelector('[data-form-success]');

    const clearErrors = () => {
        form.querySelectorAll('.is-invalid').forEach((field) => {
            field.classList.remove('is-invalid');
            field.removeAttribute('aria-invalid');
        });
        form.querySelectorAll('[data-error-for]').forEach((message) => { message.textContent = ''; });
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        clearErrors();
        const data = new FormData(form);
        const errors = validateTrialForm({
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            phone: data.get('phone'),
            training: data.get('training'),
            accepted: data.get('accepted') === 'on',
        });

        const invalidFields = Object.keys(errors);
        invalidFields.forEach((name) => {
            const field = form.elements.namedItem(name);
            const message = form.querySelector(`[data-error-for="${name}"]`);
            field?.classList.add('is-invalid');
            field?.setAttribute('aria-invalid', 'true');
            if (message) message.textContent = errors[name];
        });

        if (invalidFields.length) {
            form.elements.namedItem(invalidFields[0])?.focus();
            return;
        }

        submit.disabled = true;
        submit.classList.add('is-loading');
        submitLabel.textContent = 'Enviando';
        window.setTimeout(() => {
            form.classList.add('is-success');
            form.setAttribute('aria-hidden', 'true');
            success.hidden = false;
            requestAnimationFrame(() => success.classList.add('is-visible'));
            success.focus();
        }, 700);
    });
}

if (typeof document !== 'undefined') {
    setupMenu();
    setupHeader();
    setupReveals();
    setupCounters();
    setupTrialForm();
}
