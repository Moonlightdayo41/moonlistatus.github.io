document.addEventListener('DOMContentLoaded', function() {
    const serverStatus = document.getElementById('server-status');
    const serverVersion = document.getElementById('server-version');
    const serverAddress = document.getElementById('server-address');
    const serverPort = document.getElementById('server-port');
    const playerCount = document.getElementById('player-count');
    const lastUpdated = document.getElementById('last-updated');

    // サーバー情報を取得する関数
    async function getServerStatus() {
        const response = await fetch('https://api.mcsrvstat.us/2/moonliser.f5.si');
        const data = await response.json();

        // APIレスポンスをコンソールに出力して確認
        

        // 現在の日時を取得
        const currentDate = new Date();
  
        // 時間を12時間形式で取得
        const options = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        };

        // フォーマットした時刻を取得
        const formattedTime = new Intl.DateTimeFormat('en-US', options).format(currentDate);

        // フォーマットされた時刻が取得できているか確認
        console.log("Formatted Time: ", formattedTime);

        // サーバーがオンラインの場合
        if (data.online) {
            serverStatus.textContent = '🟢Online';
            serverVersion.textContent = data.version || 'No Data';
            serverAddress.textContent = data.hostname || 'No Data';
            serverPort.textContent = data.port || 'No Data';
            const onlinePlayers = data.players.online || 0;
            const maxPlayers = data.players.max || 0;
            playerCount.textContent = `${onlinePlayers} / ${maxPlayers}`;
            lastUpdated.textContent = `Updated: ${formattedTime}`; // 情報取得時刻を表示
        } else {
            serverStatus.textContent = '🔴Offline';
            serverVersion.textContent = 'N/A';
            serverAddress.textContent = 'N/A';
            serverPort.textContent = 'N/A';
            playerCount.textContent = 'N/A';
            lastUpdated.textContent = `Updated: ${formattedTime}`; // 情報取得時刻を表示
        }
    }

    // ページロード時にサーバー情報を取得
    getServerStatus();

    // 定期的にサーバー情報を更新（1分ごとに再取得）
    setInterval(getServerStatus, 6000);
});
