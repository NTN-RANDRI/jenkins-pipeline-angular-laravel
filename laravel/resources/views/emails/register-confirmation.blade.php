<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title>Confirmation d'inscription</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">

        <div style="
            max-width: 600px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0,0,0,0.1);
        ">

            <h2 style="color: #333;">
                Bonjour {{ $profileEntity->getPrenom() ?? $profileEntity->getNom() }},
            </h2>

            <p style="font-size: 16px; color: #555;">
                Merci pour votre inscription.
            </p>

            <p style="font-size: 16px; color: #555;">
                Cliquez sur le bouton ci-dessous pour confirmer votre adresse email :
            </p>

            <div style="text-align: center; margin: 30px 0;">
                <a href="{{ $url }}"
                style="
                        background-color: #2563eb;
                        color: white;
                        padding: 14px 24px;
                        text-decoration: none;
                        border-radius: 6px;
                        display: inline-block;
                        font-weight: bold;
                ">
                    Confirmer mon compte
                </a>
            </div>

            <p style="font-size: 14px; color: #777;">
                Ce lien expirera bientôt.
            </p>

            <p style="font-size: 14px; color: #777;">
                Si vous n'êtes pas à l'origine de cette inscription, vous pouvez ignorer cet email.
            </p>

        </div>

    </body>
</html>