<style>
    .loading {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: 100vh;
        z-index: 10;
    }

    .lds-ring {
        display: inline-block;
        position: relative;
        width: 14rem;
        height: 14rem;
    }
    .lds-ring div {
        box-sizing: border-box;
        display: block;
        position: absolute;
        width: 14rem;
        height: 14rem;
        margin: 6px;
        border: 18px solid #114b5f;
        border-radius: 50%;
        animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        border-color: #114b5f transparent transparent transparent;
    }
    .lds-ring div:nth-child(1) {
        animation-delay: -0.45s;
    }
    .lds-ring div:nth-child(2) {
        animation-delay: -0.3s;
    }
    .lds-ring div:nth-child(3) {
        animation-delay: -0.15s;
    }
    @keyframes lds-ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>

<div class="loading">
    <div class="lds-ring">
        <div />
        <div />
        <div />
        <div />
    </div>
</div>
