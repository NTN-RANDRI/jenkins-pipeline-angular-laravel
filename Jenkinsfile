pipeline {
    agent any

    stages {

        stage('CI') {
            stages {

                stage('Clone') {
                    steps {
                        git branch: 'main',
                            credentialsId: 'premier-credentials',
                            url: 'https://github.com/NTN-RANDRI/jenkins-pipeline-angular-laravel.git'
                    }
                }

                stage('Composer Install') {
                    steps {
                        bat '''
                            cd /d "%WORKSPACE%\\laravel"

                            composer install --no-interaction --prefer-dist
                        '''
                    }
                }
            }
        }

        stage('CD') {
            stages {

                stage('Deploy') {
                    steps {
                        bat '''
                            if not exist "D:\\BOSSY\\projet\\academique\\Jenkins\\serveur\\mon-app" mkdir "D:\\BOSSY\\projet\\academique\\Jenkins\\serveur\\mon-app"

                            robocopy "%WORKSPACE%\\laravel" "D:\\BOSSY\\projet\\academique\\Jenkins\\serveur\\mon-app\\laravel" /E /XD .git /XF .env

                            if %ERRORLEVEL% LEQ 7 exit /B 0
                            exit /B %ERRORLEVEL%
                        '''
                    }
                }

                stage('Migration') {
                    steps {
                        bat '''
                            cd /d "D:\\BOSSY\\projet\\academique\\Jenkins\\serveur\\mon-app\\laravel"

                            php artisan migrate --force
                        '''
                    }
                }

                stage('Cache') {
                    steps {
                        bat '''
                            cd /d "D:\\BOSSY\\projet\\academique\\Jenkins\\serveur\\mon-app\\laravel"

                            php artisan config:cache
                            php artisan route:cache
                            php artisan view:cache
                        '''
                    }
                }
            }
        }
    }
}