module.exports = [{
  script: 'dist/server.js',
  name: 'multipremium-back',
  exec_mode: 'fork',
  cron_restart: '05 00 * * *',
  max_memory_restart: '769M', // Configuración para reiniciar al alcanzar 769 MB de memoria
  node_args: '--max-old-space-size=769', // Límite de memoria de Node.js a 769 MB
  watch: false
}]